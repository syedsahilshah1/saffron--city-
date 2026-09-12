const mysql = require("mysql2/promise");
const fs = require("fs");
const path = require("path");

async function syncAllToMySQL() {
  console.log("-----------------------------------------");
  console.log("🚀 Saffron City - MySQL Complete Sync Script");
  console.log("-----------------------------------------");

  const config = {
    host: process.env.MYSQL_HOST || "localhost",
    port: Number(process.env.MYSQL_PORT) || 3306,
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "",
    database: process.env.MYSQL_DATABASE || "saffron_city",
  };

  try {
    console.log(`Connecting to MySQL database \`${config.database}\` on ${config.host}:${config.port}...`);
    const conn = await mysql.createConnection(config);
    console.log("✅ Connected successfully!");

    // 1. Ensure sitesetting table exists
    await conn.query(`
      CREATE TABLE IF NOT EXISTS \`sitesetting\` (
        \`id\` VARCHAR(191) PRIMARY KEY DEFAULT 'default',
        \`siteName\` VARCHAR(191) NULL,
        \`contactPhone\` VARCHAR(191) NULL,
        \`secondaryPhone\` VARCHAR(191) NULL,
        \`whatsappPhone\` VARCHAR(191) NULL,
        \`officialEmail\` VARCHAR(191) NULL,
        \`officeAddress\` VARCHAR(191) NULL,
        \`rdaNocStatus\` VARCHAR(191) NULL,
        \`announcement\` TEXT NULL,
        \`activePreLaunchDiscount\` TINYINT(1) DEFAULT 1,
        \`smtpEnabled\` TINYINT(1) DEFAULT 1,
        \`smtpHost\` VARCHAR(191) NULL,
        \`smtpPort\` INT(11) DEFAULT 465,
        \`smtpSecure\` TINYINT(1) DEFAULT 1,
        \`smtpUser\` VARCHAR(191) NULL,
        \`smtpPass\` VARCHAR(191) NULL,
        \`smtpFromEmail\` VARCHAR(191) NULL,
        \`leadNotificationEmail\` VARCHAR(191) NULL,
        \`metaSettingsJson\` LONGTEXT NULL,
        \`heroSettingsJson\` LONGTEXT NULL,
        \`chairmanSettingsJson\` LONGTEXT NULL,
        \`masterPlanJson\` LONGTEXT NULL,
        \`sectorsJson\` LONGTEXT NULL,
        \`amenitiesJson\` LONGTEXT NULL,
        \`landmarksJson\` LONGTEXT NULL,
        \`paymentTiersJson\` LONGTEXT NULL,
        \`updatedAt\` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 2. Ensure blogs table exists
    await conn.query(`
      CREATE TABLE IF NOT EXISTS \`blogs\` (
        \`id\` VARCHAR(191) PRIMARY KEY,
        \`slug\` VARCHAR(191) UNIQUE NOT NULL,
        \`title\` VARCHAR(255) NOT NULL,
        \`excerpt\` TEXT NULL,
        \`content\` LONGTEXT NULL,
        \`image\` VARCHAR(500) NULL,
        \`category\` VARCHAR(100) NOT NULL,
        \`author\` VARCHAR(191) NOT NULL,
        \`readTime\` VARCHAR(50) NOT NULL,
        \`isPublished\` TINYINT(1) DEFAULT 1,
        \`seoTitle\` VARCHAR(255) NULL,
        \`metaDescription\` TEXT NULL,
        \`canonicalUrl\` VARCHAR(500) NULL,
        \`robotsIndex\` TINYINT(1) DEFAULT 1,
        \`robotsFollow\` TINYINT(1) DEFAULT 1,
        \`focusKeyword\` VARCHAR(255) NULL,
        \`secondaryKeywords\` TEXT NULL,
        \`h1Heading\` VARCHAR(255) NULL,
        \`createdAt\` DATETIME DEFAULT CURRENT_TIMESTAMP,
        \`updatedAt\` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 3. Ensure pageseo table exists
    await conn.query(`
      CREATE TABLE IF NOT EXISTS \`pageseo\` (
        \`id\` VARCHAR(191) PRIMARY KEY,
        \`path\` VARCHAR(191) UNIQUE NOT NULL,
        \`pageName\` VARCHAR(191) NOT NULL,
        \`metaTitle\` VARCHAR(255) NOT NULL,
        \`metaDescription\` TEXT NOT NULL,
        \`h1Heading\` VARCHAR(255) NULL,
        \`focusKeyword\` VARCHAR(255) NULL,
        \`secondaryKeywords\` TEXT NULL,
        \`canonicalUrl\` VARCHAR(500) NULL,
        \`robotsIndex\` TINYINT(1) DEFAULT 1,
        \`robotsFollow\` TINYINT(1) DEFAULT 1,
        \`ogTitle\` VARCHAR(255) NULL,
        \`ogDescription\` TEXT NULL,
        \`ogImage\` VARCHAR(500) NULL,
        \`twitterTitle\` VARCHAR(255) NULL,
        \`twitterDescription\` TEXT NULL,
        \`twitterImage\` VARCHAR(500) NULL,
        \`schemaType\` VARCHAR(100) DEFAULT 'ItemPage',
        \`customJsonLd\` LONGTEXT NULL,
        \`updatedAt\` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 4. Ensure redirects table exists
    await conn.query(`
      CREATE TABLE IF NOT EXISTS \`redirects\` (
        \`id\` VARCHAR(191) PRIMARY KEY,
        \`sourcePath\` VARCHAR(191) UNIQUE NOT NULL,
        \`destinationUrl\` VARCHAR(500) NOT NULL,
        \`statusCode\` INT DEFAULT 301,
        \`isActive\` TINYINT(1) DEFAULT 1,
        \`hitCount\` INT DEFAULT 0,
        \`createdAt\` DATETIME DEFAULT CURRENT_TIMESTAMP,
        \`updatedAt\` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 5. Read data from cms_store.json to sync everything
    const storePath = path.join(__dirname, "..", "data", "cms_store.json");
    if (fs.existsSync(storePath)) {
      const store = JSON.parse(fs.readFileSync(storePath, "utf-8"));

      // Sync settings
      if (store.settings) {
        console.log("Syncing sitesetting to MySQL...");
        const s = store.settings;
        const metaSettings = {
          metaTitle: s.metaTitle,
          metaDescription: s.metaDescription,
          metaKeywords: s.metaKeywords,
          canonicalUrl: s.canonicalUrl,
          googleSiteVerification: s.googleSiteVerification,
          defaultRobotsIndex: s.defaultRobotsIndex,
          defaultRobotsFollow: s.defaultRobotsFollow,
          ogTitle: s.ogTitle,
          ogDescription: s.ogDescription,
          ogImage: s.ogImage,
          twitterCard: s.twitterCard,
          twitterSite: s.twitterSite,
          twitterCreator: s.twitterCreator,
          twitterTitle: s.twitterTitle,
          twitterDescription: s.twitterDescription,
          twitterImage: s.twitterImage,
          orgName: s.orgName,
          orgLogo: s.orgLogo,
          orgLegalName: s.orgLegalName,
          orgPriceRange: s.orgPriceRange,
          orgStreetAddress: s.orgStreetAddress,
          orgAddressLocality: s.orgAddressLocality,
          orgAddressRegion: s.orgAddressRegion,
          orgPostalCode: s.orgPostalCode,
          orgAddressCountry: s.orgAddressCountry,
          orgGeoLat: s.orgGeoLat,
          orgGeoLng: s.orgGeoLng,
          orgOpeningDays: s.orgOpeningDays,
          orgOpeningHoursOpens: s.orgOpeningHoursOpens,
          orgOpeningHoursCloses: s.orgOpeningHoursCloses,
          facebookUrl: s.facebookUrl,
          instagramUrl: s.instagramUrl,
          youtubeUrl: s.youtubeUrl,
          linkedinUrl: s.linkedinUrl,
          twitterUrl: s.twitterUrl,
          googleAnalyticsId: s.googleAnalyticsId,
          googleTagManagerId: s.googleTagManagerId,
          customHeadScript: s.customHeadScript,
        };

        const heroSettings = {
          heroTitle: s.heroTitle,
          heroHighlightedWord: s.heroHighlightedWord,
          heroSubtitle: s.heroSubtitle,
          heroBgImage: s.heroBgImage,
          heroButtonText: s.heroButtonText,
        };

        const chairmanSettings = {
          chairmanHeadingTop: s.chairmanHeadingTop,
          chairmanHeadingSub: s.chairmanHeadingSub,
          chairmanHeadingMain: s.chairmanHeadingMain,
          chairmanName: s.chairmanName,
          chairmanTitle: s.chairmanTitle,
          chairmanBioShort: s.chairmanBioShort,
          chairmanBioFull: s.chairmanBioFull,
          chairmanCtaText: s.chairmanCtaText,
          chairmanCtaLink: s.chairmanCtaLink,
          chairmanPortrait: s.chairmanPortrait,
        };

        await conn.query(`
          INSERT INTO \`sitesetting\` (
            id, siteName, contactPhone, secondaryPhone, whatsappPhone, officialEmail,
            officeAddress, rdaNocStatus, announcement, activePreLaunchDiscount,
            smtpEnabled, smtpHost, smtpPort, smtpSecure, smtpUser, smtpPass,
            smtpFromEmail, leadNotificationEmail, metaSettingsJson, heroSettingsJson,
            chairmanSettingsJson, amenitiesJson, landmarksJson, paymentTiersJson
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          ON DUPLICATE KEY UPDATE
            siteName = VALUES(siteName),
            contactPhone = VALUES(contactPhone),
            secondaryPhone = VALUES(secondaryPhone),
            whatsappPhone = VALUES(whatsappPhone),
            officialEmail = VALUES(officialEmail),
            officeAddress = VALUES(officeAddress),
            rdaNocStatus = VALUES(rdaNocStatus),
            announcement = VALUES(announcement),
            activePreLaunchDiscount = VALUES(activePreLaunchDiscount),
            smtpEnabled = VALUES(smtpEnabled),
            smtpHost = VALUES(smtpHost),
            smtpPort = VALUES(smtpPort),
            smtpSecure = VALUES(smtpSecure),
            smtpUser = VALUES(smtpUser),
            smtpPass = VALUES(smtpPass),
            smtpFromEmail = VALUES(smtpFromEmail),
            leadNotificationEmail = VALUES(leadNotificationEmail),
            metaSettingsJson = VALUES(metaSettingsJson),
            heroSettingsJson = VALUES(heroSettingsJson),
            chairmanSettingsJson = VALUES(chairmanSettingsJson),
            amenitiesJson = VALUES(amenitiesJson),
            landmarksJson = VALUES(landmarksJson),
            paymentTiersJson = VALUES(paymentTiersJson);
        `, [
          "default",
          s.siteName || "Saffron City Islamabad",
          s.contactPhone || "+92 333 1113551",
          s.secondaryPhone || "+92 51 111 723 376",
          s.whatsappPhone || "923331113551",
          s.officialEmail || "info@saffroncity.org",
          s.officeAddress || "Main GT Road, Near T-Chowk, Rawat, Islamabad / Rawalpindi",
          s.rdaNocStatus || "RDA Approved (Full 15,000 Kanal)",
          s.announcement || "",
          s.activePreLaunchDiscount ? 1 : 0,
          s.smtpEnabled ? 1 : 0,
          s.smtpHost || "smtp.gmail.com",
          s.smtpPort || 465,
          s.smtpSecure ? 1 : 0,
          s.smtpUser || "",
          s.smtpPass || "",
          s.smtpFromEmail || "info@saffroncity.org",
          s.leadNotificationEmail || "info@saffroncity.org",
          JSON.stringify(metaSettings),
          JSON.stringify(heroSettings),
          JSON.stringify(chairmanSettings),
          JSON.stringify(s.amenities || []),
          JSON.stringify(s.landmarks || []),
          JSON.stringify(s.paymentTiers || []),
        ]);
        console.log("✅ sitesetting synced to MySQL.");
      }

      // Sync Page SEO
      if (store.pageSeo && store.pageSeo.length > 0) {
        console.log(`Syncing ${store.pageSeo.length} page SEO entries to MySQL...`);
        for (const p of store.pageSeo) {
          await conn.query(`
            INSERT INTO \`pageseo\` (
              id, path, pageName, metaTitle, metaDescription, h1Heading,
              focusKeyword, secondaryKeywords, canonicalUrl, robotsIndex,
              robotsFollow, ogTitle, ogDescription, ogImage, twitterTitle,
              twitterDescription, twitterImage, schemaType, customJsonLd
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
              pageName = VALUES(pageName),
              metaTitle = VALUES(metaTitle),
              metaDescription = VALUES(metaDescription),
              h1Heading = VALUES(h1Heading),
              focusKeyword = VALUES(focusKeyword),
              secondaryKeywords = VALUES(secondaryKeywords),
              canonicalUrl = VALUES(canonicalUrl),
              robotsIndex = VALUES(robotsIndex),
              robotsFollow = VALUES(robotsFollow),
              ogTitle = VALUES(ogTitle),
              ogDescription = VALUES(ogDescription),
              ogImage = VALUES(ogImage),
              twitterTitle = VALUES(twitterTitle),
              twitterDescription = VALUES(twitterDescription),
              twitterImage = VALUES(twitterImage),
              schemaType = VALUES(schemaType),
              customJsonLd = VALUES(customJsonLd);
          `, [
            p.id,
            p.path,
            p.pageName,
            p.metaTitle,
            p.metaDescription,
            p.h1Heading || null,
            p.focusKeyword || null,
            p.secondaryKeywords || null,
            p.canonicalUrl || null,
            p.robotsIndex !== false ? 1 : 0,
            p.robotsFollow !== false ? 1 : 0,
            p.ogTitle || null,
            p.ogDescription || null,
            p.ogImage || null,
            p.twitterTitle || null,
            p.twitterDescription || null,
            p.twitterImage || null,
            p.schemaType || "ItemPage",
            p.customJsonLd || null,
          ]);
        }
        console.log("✅ Page SEO synced to MySQL.");
      }

      // Sync Redirects
      if (store.redirects && store.redirects.length > 0) {
        console.log(`Syncing ${store.redirects.length} redirects to MySQL...`);
        for (const r of store.redirects) {
          await conn.query(`
            INSERT INTO \`redirects\` (id, sourcePath, destinationUrl, statusCode, isActive, hitCount)
            VALUES (?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
              destinationUrl = VALUES(destinationUrl),
              statusCode = VALUES(statusCode),
              isActive = VALUES(isActive);
          `, [
            r.id,
            r.sourcePath,
            r.destinationUrl,
            r.statusCode || 301,
            r.isActive !== false ? 1 : 0,
            r.hitCount || 0,
          ]);
        }
        console.log("✅ Redirects synced to MySQL.");
      }

      // Sync Blogs
      if (store.blogs && store.blogs.length > 0) {
        console.log(`Syncing ${store.blogs.length} blogs to MySQL...`);
        for (const b of store.blogs) {
          await conn.query(`
            INSERT INTO \`blogs\` (
              id, slug, title, excerpt, content, image, category, author,
              readTime, isPublished, seoTitle, metaDescription, canonicalUrl,
              robotsIndex, robotsFollow, focusKeyword, secondaryKeywords, h1Heading
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
              title = VALUES(title),
              excerpt = VALUES(excerpt),
              content = VALUES(content),
              image = VALUES(image),
              category = VALUES(category),
              author = VALUES(author),
              readTime = VALUES(readTime),
              isPublished = VALUES(isPublished),
              seoTitle = VALUES(seoTitle),
              metaDescription = VALUES(metaDescription),
              canonicalUrl = VALUES(canonicalUrl),
              robotsIndex = VALUES(robotsIndex),
              robotsFollow = VALUES(robotsFollow),
              focusKeyword = VALUES(focusKeyword),
              secondaryKeywords = VALUES(secondaryKeywords),
              h1Heading = VALUES(h1Heading);
          `, [
            b.id,
            b.slug,
            b.title,
            b.excerpt || null,
            b.content || null,
            b.image || null,
            b.category || "Market Update",
            b.author || "Saffron City Official",
            b.readTime || "4 min read",
            b.isPublished !== false ? 1 : 0,
            b.seoTitle || null,
            b.metaDescription || null,
            b.canonicalUrl || null,
            b.robotsIndex !== false ? 1 : 0,
            b.robotsFollow !== false ? 1 : 0,
            b.focusKeyword || null,
            b.secondaryKeywords || null,
            b.h1Heading || null,
          ]);
        }
        console.log("✅ Blogs synced to MySQL.");
      }
    }

    console.log("-----------------------------------------");
    console.log("🎉 MYSQL FULL SYNC COMPLETED SUCCESSFULLY!");
    console.log("-----------------------------------------");
    await conn.end();
  } catch (err) {
    console.error("❌ Sync Error:", err);
  }
}

syncAllToMySQL();
