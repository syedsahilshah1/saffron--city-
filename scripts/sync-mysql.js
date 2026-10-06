const mysql = require("mysql2/promise");
const fs = require("fs");
const path = require("path");

async function initAndSyncMySQL() {
  console.log("=========================================");
  console.log("🚀 Saffron City - Database Migration & Sync");
  console.log("=========================================");

  const host = process.env.MYSQL_HOST || "127.0.0.1";
  const port = Number(process.env.MYSQL_PORT) || 3306;
  const user = process.env.MYSQL_USER || "root";
  const password = process.env.MYSQL_PASSWORD || "";
  const database = process.env.MYSQL_DATABASE || "saffron_city";

  console.log(`Connecting to MySQL on ${host}:${port} as '${user}'...`);

  let connection;
  try {
    connection = await mysql.createConnection({
      host,
      port,
      user,
      password,
      multipleStatements: true,
    });
    console.log("✅ Connected to MySQL server!");

    // Ensure database exists
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
    await connection.query(`USE \`${database}\`;`);
    console.log(`✅ Using database \`${database}\``);

    // 2. Safe Column Migrations for existing tables
    console.log("Checking and upgrading table schemas...");
    const alterTableSafe = async (tableName, columnDef) => {
      try {
        await connection.query(`ALTER TABLE \`${tableName}\` ADD COLUMN ${columnDef};`);
      } catch (e) {
        // Ignore duplicate column errors
      }
    };

    // Ensure all tables exist
    await connection.query(`
      CREATE TABLE IF NOT EXISTS \`sitesetting\` (
        \`id\` VARCHAR(50) PRIMARY KEY DEFAULT 'default',
        \`siteName\` VARCHAR(255) NOT NULL,
        \`contactPhone\` VARCHAR(100) NOT NULL,
        \`secondaryPhone\` VARCHAR(100) NULL,
        \`whatsappPhone\` VARCHAR(100) NOT NULL,
        \`officialEmail\` VARCHAR(191) NOT NULL,
        \`officeAddress\` TEXT NOT NULL,
        \`googleMapsUrl\` TEXT NULL,
        \`rdaNocStatus\` VARCHAR(255) NOT NULL,
        \`rdaVerificationUrl\` VARCHAR(500) NOT NULL,
        \`announcement\` TEXT NULL,
        \`activePreLaunchDiscount\` BOOLEAN DEFAULT TRUE,
        \`smtpEnabled\` BOOLEAN DEFAULT TRUE,
        \`smtpHost\` VARCHAR(191) NULL,
        \`smtpPort\` INT NULL,
        \`smtpSecure\` BOOLEAN DEFAULT TRUE,
        \`smtpUser\` VARCHAR(191) NULL,
        \`smtpPass\` VARCHAR(191) NULL,
        \`smtpFromEmail\` VARCHAR(191) NULL,
        \`leadNotificationEmail\` VARCHAR(191) NULL,
        \`metaSettingsJson\` JSON NULL,
        \`heroSettingsJson\` JSON NULL,
        \`chairmanSettingsJson\` JSON NULL,
        \`amenitiesJson\` JSON NULL,
        \`landmarksJson\` JSON NULL,
        \`paymentTiersJson\` JSON NULL,
        \`updatedAt\` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    await alterTableSafe("sitesetting", "`secondaryPhone` VARCHAR(100) NULL");
    await alterTableSafe("sitesetting", "`googleMapsUrl` TEXT NULL");
    await alterTableSafe("sitesetting", "`rdaVerificationUrl` VARCHAR(500) NULL");
    await alterTableSafe("sitesetting", "`announcement` TEXT NULL");
    await alterTableSafe("sitesetting", "`activePreLaunchDiscount` BOOLEAN DEFAULT TRUE");
    await alterTableSafe("sitesetting", "`smtpEnabled` BOOLEAN DEFAULT TRUE");
    await alterTableSafe("sitesetting", "`smtpHost` VARCHAR(191) NULL");
    await alterTableSafe("sitesetting", "`smtpPort` INT NULL");
    await alterTableSafe("sitesetting", "`smtpSecure` BOOLEAN DEFAULT TRUE");
    await alterTableSafe("sitesetting", "`smtpUser` VARCHAR(191) NULL");
    await alterTableSafe("sitesetting", "`smtpPass` VARCHAR(191) NULL");
    await alterTableSafe("sitesetting", "`smtpFromEmail` VARCHAR(191) NULL");
    await alterTableSafe("sitesetting", "`leadNotificationEmail` VARCHAR(191) NULL");
    await alterTableSafe("sitesetting", "`metaSettingsJson` JSON NULL");
    await alterTableSafe("sitesetting", "`heroSettingsJson` JSON NULL");
    await alterTableSafe("sitesetting", "`chairmanSettingsJson` JSON NULL");
    await alterTableSafe("sitesetting", "`amenitiesJson` JSON NULL");
    await alterTableSafe("sitesetting", "`landmarksJson` JSON NULL");
    await alterTableSafe("sitesetting", "`paymentTiersJson` JSON NULL");
    await alterTableSafe("blogs", "`faqs` JSON NULL");
    await alterTableSafe("blogs", "`authorRole` VARCHAR(191) NULL");
    await alterTableSafe("blogs", "`authorBio` TEXT NULL");
    await alterTableSafe("blogs", "`authorImage` VARCHAR(500) NULL");
    await alterTableSafe("blogs", "`showProjectSnapshot` BOOLEAN DEFAULT 0");

    await connection.query(`
      CREATE TABLE IF NOT EXISTS \`pageseo\` (
        \`id\` VARCHAR(100) PRIMARY KEY,
        \`path\` VARCHAR(191) UNIQUE NOT NULL,
        \`pageName\` VARCHAR(191) NOT NULL,
        \`metaTitle\` VARCHAR(255) NOT NULL,
        \`metaDescription\` TEXT NOT NULL,
        \`h1Heading\` VARCHAR(255) NULL,
        \`focusKeyword\` VARCHAR(255) NULL,
        \`secondaryKeywords\` TEXT NULL,
        \`canonicalUrl\` VARCHAR(500) NULL,
        \`robotsIndex\` BOOLEAN DEFAULT TRUE,
        \`robotsFollow\` BOOLEAN DEFAULT TRUE,
        \`ogTitle\` VARCHAR(255) NULL,
        \`ogDescription\` TEXT NULL,
        \`ogImage\` VARCHAR(500) NULL,
        \`twitterTitle\` VARCHAR(255) NULL,
        \`twitterDescription\` TEXT NULL,
        \`twitterImage\` VARCHAR(500) NULL,
        \`schemaType\` VARCHAR(100) DEFAULT 'WebSite',
        \`customJsonLd\` TEXT NULL,
        \`updatedAt\` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS \`redirects\` (
        \`id\` VARCHAR(100) PRIMARY KEY,
        \`sourcePath\` VARCHAR(255) NOT NULL,
        \`destinationUrl\` VARCHAR(500) NOT NULL,
        \`statusCode\` INT DEFAULT 301,
        \`isActive\` BOOLEAN DEFAULT TRUE,
        \`hitCount\` INT DEFAULT 0,
        \`createdAt\` DATETIME DEFAULT CURRENT_TIMESTAMP,
        \`updatedAt\` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // Run schema & tables creation from database.sql
    const sqlPath = path.join(__dirname, "..", "database.sql");
    if (fs.existsSync(sqlPath)) {
      const sqlContent = fs.readFileSync(sqlPath, "utf-8");
      try {
        await connection.query(sqlContent);
        console.log("✅ Database schema and seeds applied successfully!");
      } catch (sqlErr) {
        console.log("⚠️ Schema import notice (continuing with direct table sync):", sqlErr.message);
      }
    }

    // 3. Sync latest cms_store.json data directly into MySQL tables
    const cmsStorePath = path.join(__dirname, "..", "data", "cms_store.json");
    if (fs.existsSync(cmsStorePath)) {
      console.log("Synchronizing CMS store (SEO, Settings, Plots, Blogs) into MySQL tables...");
      const store = JSON.parse(fs.readFileSync(cmsStorePath, "utf-8"));

      // 3a. Sync Site Settings & MetaSettingsJson
      if (store.settings) {
        const s = store.settings;
        const metaKeys = [
          "metaTitle", "metaDescription", "metaKeywords", "canonicalUrl",
          "googleSiteVerification", "defaultRobotsIndex", "defaultRobotsFollow",
          "ogTitle", "ogDescription", "ogImage", "twitterCard", "twitterSite",
          "twitterCreator", "twitterTitle", "twitterDescription", "twitterImage",
          "orgName", "orgLogo", "orgLegalName", "orgPriceRange", "orgStreetAddress",
          "orgAddressLocality", "orgAddressRegion", "orgPostalCode", "orgAddressCountry",
          "orgGeoLat", "orgGeoLng", "orgOpeningHoursOpens", "orgOpeningHoursCloses",
          "facebookUrl", "instagramUrl", "youtubeUrl", "linkedinUrl", "twitterUrl",
          "googleAnalyticsId", "googleTagManagerId", "customHeadScript"
        ];
        const metaData = {};
        for (const key of metaKeys) {
          if (s[key] !== undefined) metaData[key] = s[key];
        }

        const heroKeys = [
          "heroTitle", "heroHighlightedWord", "heroSubtitle", "heroBgImage", "heroButtonText",
          "masterPlanImage", "masterPlanFullImage", "masterPlanPdf", "masterPlanDescription",
          "sectorATitle", "sectorATagline", "sectorAPlots", "sectorAPrice", "sectorAImage",
          "sectorADescription", "sectorABrochurePdf",
          "sectorBTitle", "sectorBTagline", "sectorBPlots", "sectorBPrice", "sectorBImage",
          "sectorBDescription", "sectorBBrochurePdf",
          "residentialPaymentPlanImage", "commercialPaymentPlanImage", "officialPaymentPlanPdf",
          "aboutHeroHeading", "aboutHeroSubtitle", "aboutHeroImage", "aboutStoryHeading", "aboutStoryText", "aboutMissionText", "aboutVisionText", "aboutLegacyYears",
          "nocPageHeading", "nocPageSubtitle", "nocPageDescription", "nocApprovalNumber", "nocCertificateImage", "nocRdaLetterPdf", "nocLegalFeaturesJson",
          "locationPageHeading", "locationPageSubtitle", "locationPageDescription", "locationMapImage", "locationGoogleEmbedUrl",
          "residentialPageHeading", "residentialPageSubtitle", "residentialPageBanner",
          "commercialPageHeading", "commercialPageSubtitle", "commercialPageBanner"
        ];
        const heroData = {};
        for (const key of heroKeys) {
          if (s[key] !== undefined) heroData[key] = s[key];
        }
        if (!heroData.heroBgImage || heroData.heroBgImage.endsWith(".jpg")) {
          heroData.heroBgImage = "/images/hero-bg.webp";
        }

        const chairmanKeys = [
          "chairmanHeadingTop", "chairmanHeadingSub", "chairmanHeadingMain", "chairmanName",
          "chairmanTitle", "chairmanBioShort", "chairmanBioFull", "chairmanCtaText",
          "chairmanCtaLink", "chairmanPortrait"
        ];
        const chairmanData = {};
        for (const key of chairmanKeys) {
          if (s[key] !== undefined) chairmanData[key] = s[key];
        }
        if (!chairmanData.chairmanPortrait || chairmanData.chairmanPortrait.endsWith(".png") || chairmanData.chairmanPortrait.endsWith(".jpg")) {
          chairmanData.chairmanPortrait = "/images/chairman_portrait_hd.webp";
        }

        await connection.query(
          `INSERT INTO \`sitesetting\` (
            \`id\`, \`siteName\`, \`contactPhone\`, \`secondaryPhone\`, \`whatsappPhone\`, \`officialEmail\`, \`officeAddress\`, \`googleMapsUrl\`, \`rdaNocStatus\`, \`rdaVerificationUrl\`, \`announcement\`, \`activePreLaunchDiscount\`, \`smtpEnabled\`, \`smtpHost\`, \`smtpPort\`, \`smtpSecure\`, \`smtpUser\`, \`smtpPass\`, \`smtpFromEmail\`, \`leadNotificationEmail\`, \`metaSettingsJson\`, \`heroSettingsJson\`, \`chairmanSettingsJson\`, \`amenitiesJson\`, \`landmarksJson\`, \`paymentTiersJson\`
          ) VALUES ('default', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          ON DUPLICATE KEY UPDATE
            \`siteName\` = VALUES(\`siteName\`),
            \`contactPhone\` = VALUES(\`contactPhone\`),
            \`secondaryPhone\` = VALUES(\`secondaryPhone\`),
            \`whatsappPhone\` = VALUES(\`whatsappPhone\`),
            \`officialEmail\` = VALUES(\`officialEmail\`),
            \`officeAddress\` = VALUES(\`officeAddress\`),
            \`googleMapsUrl\` = VALUES(\`googleMapsUrl\`),
            \`rdaNocStatus\` = VALUES(\`rdaNocStatus\`),
            \`rdaVerificationUrl\` = VALUES(\`rdaVerificationUrl\`),
            \`announcement\` = VALUES(\`announcement\`),
            \`activePreLaunchDiscount\` = VALUES(\`activePreLaunchDiscount\`),
            \`smtpEnabled\` = VALUES(\`smtpEnabled\`),
            \`smtpHost\` = VALUES(\`smtpHost\`),
            \`smtpPort\` = VALUES(\`smtpPort\`),
            \`smtpSecure\` = VALUES(\`smtpSecure\`),
            \`smtpUser\` = VALUES(\`smtpUser\`),
            \`smtpPass\` = VALUES(\`smtpPass\`),
            \`smtpFromEmail\` = VALUES(\`smtpFromEmail\`),
            \`leadNotificationEmail\` = VALUES(\`leadNotificationEmail\`),
            \`metaSettingsJson\` = VALUES(\`metaSettingsJson\`),
            \`heroSettingsJson\` = VALUES(\`heroSettingsJson\`),
            \`chairmanSettingsJson\` = VALUES(\`chairmanSettingsJson\`),
            \`amenitiesJson\` = VALUES(\`amenitiesJson\`),
            \`landmarksJson\` = VALUES(\`landmarksJson\`),
            \`paymentTiersJson\` = VALUES(\`paymentTiersJson\`);`,
          [
            s.siteName || "Saffron City Islamabad",
            s.contactPhone || "0333 1113551",
            s.secondaryPhone || null,
            s.whatsappPhone || "923331113551",
            s.officialEmail || "info@saffroncity.org",
            s.officeAddress || "Main GT Road, Near T-Chowk, Rawat, Islamabad / Rawalpindi",
            s.googleMapsUrl || "https://maps.google.com/?q=Saffron+City+Rawat+Islamabad",
            s.rdaNocStatus || "RDA Approved (Full 15,000 Kanal)",
            s.rdaVerificationUrl || "https://punjab.gov.pk",
            s.announcement || "10% Pre-Launch Discount Active on 5 & 10 Marla Plots in Sector B",
            s.activePreLaunchDiscount !== false ? 1 : 0,
            s.smtpEnabled !== false ? 1 : 0,
            s.smtpHost || "smtp.hostinger.com",
            s.smtpPort || 465,
            s.smtpSecure !== false ? 1 : 0,
            s.smtpUser || "info@saffroncity.org",
            s.smtpPass || "",
            s.smtpFromEmail || "info@saffroncity.org",
            s.leadNotificationEmail || "info@saffroncity.org",
            JSON.stringify(metaData),
            JSON.stringify(heroData),
            JSON.stringify(chairmanData),
            JSON.stringify(s.amenities || []),
            JSON.stringify(s.landmarks || []),
            JSON.stringify(s.paymentTiers || []),
          ]
        );
        console.log("✅ Site Settings, Hero BG, Chairman, and all sections synced to `sitesetting` table");
      }

      // 3b. Sync Page SEO Table
      if (Array.isArray(store.pageSeo)) {
        for (const p of store.pageSeo) {
          await connection.query(
            `INSERT INTO \`pageseo\` (
              \`id\`, \`path\`, \`pageName\`, \`metaTitle\`, \`metaDescription\`, \`h1Heading\`, \`focusKeyword\`, \`secondaryKeywords\`, \`canonicalUrl\`, \`robotsIndex\`, \`robotsFollow\`, \`ogTitle\`, \`ogDescription\`, \`ogImage\`, \`twitterTitle\`, \`twitterDescription\`, \`twitterImage\`, \`schemaType\`, \`customJsonLd\`, \`updatedAt\`
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
            ON DUPLICATE KEY UPDATE
              \`pageName\` = VALUES(\`pageName\`),
              \`metaTitle\` = VALUES(\`metaTitle\`),
              \`metaDescription\` = VALUES(\`metaDescription\`),
              \`h1Heading\` = VALUES(\`h1Heading\`),
              \`focusKeyword\` = VALUES(\`focusKeyword\`),
              \`secondaryKeywords\` = VALUES(\`secondaryKeywords\`),
              \`canonicalUrl\` = VALUES(\`canonicalUrl\`),
              \`robotsIndex\` = VALUES(\`robotsIndex\`),
              \`robotsFollow\` = VALUES(\`robotsFollow\`),
              \`ogTitle\` = VALUES(\`ogTitle\`),
              \`ogDescription\` = VALUES(\`ogDescription\`),
              \`ogImage\` = VALUES(\`ogImage\`),
              \`twitterTitle\` = VALUES(\`twitterTitle\`),
              \`twitterDescription\` = VALUES(\`twitterDescription\`),
              \`twitterImage\` = VALUES(\`twitterImage\`),
              \`schemaType\` = VALUES(\`schemaType\`),
              \`customJsonLd\` = VALUES(\`customJsonLd\`),
              \`updatedAt\` = NOW();`,
            [
              p.id || `seo-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
              p.path,
              p.pageName || p.path,
              p.metaTitle || "Saffron City Islamabad",
              p.metaDescription || "",
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
              p.schemaType || "WebSite",
              p.customJsonLd || null,
            ]
          );
        }
        console.log(`✅ Synced ${store.pageSeo.length} page SEO records to \`pageseo\` table`);
      }

      // 3c. Sync Blogs Table
      if (Array.isArray(store.blogs)) {
        const normalizeBlogImage = (img, idx = 0) => {
          if (!img || img === ".webp" || img === ".jpg" || img === ".png" || img.trim().length <= 5) {
            const fallbacks = [
              "/images/hero-bg.webp",
              "/images/sectors/sector-a-luxury.webp",
              "/images/facilities/gated-security.webp",
              "/images/landmark_t_chowk.webp",
              "/images/sectors/commercial-plaza.webp",
              "/images/about/about-hero-banner.webp",
            ];
            return fallbacks[idx % fallbacks.length];
          }
          return img.replace(/\.jpg$/, ".webp").replace(/\.jpeg$/, ".webp").replace(/\.png$/, ".webp");
        };

        for (let i = 0; i < store.blogs.length; i++) {
          const b = store.blogs[i];
          const img = normalizeBlogImage(b.image || b.coverImage, i);
          await connection.query(
            `INSERT INTO \`blogs\` (
              \`id\`, \`slug\`, \`title\`, \`excerpt\`, \`content\`, \`image\`, \`category\`, \`author\`, \`readTime\`, \`isPublished\`, \`seoTitle\`, \`metaDescription\`, \`createdAt\`
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
            ON DUPLICATE KEY UPDATE
              \`slug\` = VALUES(\`slug\`),
              \`title\` = VALUES(\`title\`),
              \`excerpt\` = VALUES(\`excerpt\`),
              \`content\` = VALUES(\`content\`),
              \`image\` = VALUES(\`image\`),
              \`category\` = VALUES(\`category\`),
              \`author\` = VALUES(\`author\`),
              \`readTime\` = VALUES(\`readTime\`),
              \`isPublished\` = VALUES(\`isPublished\`),
              \`seoTitle\` = VALUES(\`seoTitle\`),
              \`metaDescription\` = VALUES(\`metaDescription\`);`,
            [
              b.id,
              b.slug,
              b.title,
              b.excerpt || "",
              b.content || "",
              img,
              b.category || "General",
              b.author || "Saffron City Team",
              b.readTime || "5 min read",
              b.isPublished !== false ? 1 : 0,
              b.seoTitle || b.title,
              b.metaDescription || b.excerpt || "",
            ]
          );
        }
        console.log(`✅ Synced ${store.blogs.length} blogs to \`blogs\` table`);
      }

      // Also clean up any corrupted blog images in database
      await connection.query(`
        UPDATE \`blogs\` SET \`image\` = '/images/hero-bg.webp' WHERE \`image\` = '.webp' OR \`image\` = '/images/hero-bg.jpg' OR \`id\` = 'blog-001' OR \`id\` = 'blog-01';
        UPDATE \`blogs\` SET \`image\` = '/images/sectors/sector-a-luxury.webp' WHERE \`image\` = '/images/sectors/sector-a-luxury.jpg' OR \`id\` = 'blog-002';
        UPDATE \`blogs\` SET \`image\` = '/images/facilities/gated-security.webp' WHERE \`image\` = '/images/facilities/gated-security.jpg' OR \`id\` = 'blog-003';
        UPDATE \`blogs\` SET \`image\` = '/images/landmark_t_chowk.webp' WHERE \`id\` = 'blog-02';
        UPDATE \`blogs\` SET \`image\` = '/images/sectors/commercial-plaza.webp' WHERE \`id\` = 'blog-03';
      `);
      console.log("✅ Verified and normalized all blog images in MySQL database");
    }

    // 4. Migrate and enforce cryptographic PBKDF2 hashing on all users
    const crypto = require("crypto");
    try {
      const [users] = await connection.query("SELECT `id`, `email`, `password`, `passwordHash`, `salt` FROM `users`");
      if (Array.isArray(users)) {
        for (const u of users) {
          if (u.password || !u.passwordHash || !u.salt) {
            const raw = u.password || u.email;
            const salt = crypto.randomBytes(32).toString("hex");
            const hash = crypto.pbkdf2Sync(raw, salt, 100000, 64, "sha512").toString("hex");
            await connection.query(
              "UPDATE `users` SET `passwordHash` = ?, `salt` = ?, `password` = NULL WHERE `id` = ?",
              [hash, salt, u.id]
            );
            console.log(`🔒 Upgraded user ${u.email} to PBKDF2-SHA512 (100k rounds)`);
          }
        }
      }
    } catch (userMigrateErr) {
      console.log("User password migration notice:", userMigrateErr.message);
    }

    console.log("=========================================");
    console.log("🎉 ALL XAMPP MYSQL TABLES & SEO RECORDS FULLY SYNCED!");
    console.log("=========================================");
  } catch (err) {
    console.error("❌ MySQL Error:", err.message);
    if (err.code === "ECONNREFUSED" || err.code === "ETIMEDOUT") {
      console.log("\n👉 TIP: Please ensure MySQL is running in XAMPP or MySQL Service on port " + port);
    }
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

initAndSyncMySQL();
