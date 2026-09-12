const mysql = require("mysql2/promise");
const fs = require("fs");
const path = require("path");

async function syncAllToMySQL() {
  console.log("=========================================");
  console.log("🚀 Saffron City - MySQL Database Master Sync");
  console.log("=========================================");

  const config = {
    host: process.env.MYSQL_HOST || "127.0.0.1",
    port: Number(process.env.MYSQL_PORT) || 3306,
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "",
    database: process.env.MYSQL_DATABASE || "saffron_city",
    multipleStatements: true,
  };

  try {
    console.log(`Connecting to MySQL on ${config.host}:${config.port}...`);
    // Connect without database first to ensure database exists
    const serverConn = await mysql.createConnection({
      host: config.host,
      port: config.port,
      user: config.user,
      password: config.password,
    });

    await serverConn.query(`CREATE DATABASE IF NOT EXISTS \`${config.database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
    await serverConn.end();

    const conn = await mysql.createConnection(config);
    console.log(`✅ Connected successfully to database \`${config.database}\`!`);

    // 1. Run database.sql if available
    const sqlPath = path.join(__dirname, "..", "database.sql");
    if (fs.existsSync(sqlPath)) {
      console.log("Applying complete database.sql schema & seeds...");
      const sqlContent = fs.readFileSync(sqlPath, "utf-8");
      await conn.query(sqlContent);
      console.log("✅ database.sql executed successfully!");
    }

    // 2. Read cms_store.json if exists and sync any extra records
    const storePath = path.join(__dirname, "..", "data", "cms_store.json");
    if (fs.existsSync(storePath)) {
      console.log("Syncing additional records from cms_store.json...");
      const store = JSON.parse(fs.readFileSync(storePath, "utf-8"));

      // Sync Users
      if (store.users && Array.isArray(store.users)) {
        for (const u of store.users) {
          await conn.query(`
            INSERT INTO \`users\` (\`id\`, \`email\`, \`name\`, \`passwordHash\`, \`salt\`, \`role\`, \`permissions\`, \`isActive\`, \`createdAt\`)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
              \`name\` = VALUES(\`name\`),
              \`passwordHash\` = VALUES(\`passwordHash\`),
              \`salt\` = VALUES(\`salt\`),
              \`role\` = VALUES(\`role\`),
              \`permissions\` = VALUES(\`permissions\`),
              \`isActive\` = VALUES(\`isActive\`);
          `, [
            u.id,
            u.email.toLowerCase().trim(),
            u.name,
            u.passwordHash || null,
            u.salt || null,
            u.role || "SUPER_ADMIN",
            typeof u.permissions === "string" ? u.permissions : JSON.stringify(u.permissions || []),
            u.isActive !== false ? 1 : 0,
            u.createdAt || new Date(),
          ]);
        }
        console.log(`✅ ${store.users.length} Users synced.`);
      }

      // Sync Inquiries / Leads
      if (store.inquiries && Array.isArray(store.inquiries)) {
        for (const inq of store.inquiries) {
          await conn.query(`
            INSERT INTO \`inquiries\` (\`id\`, \`name\`, \`phone\`, \`email\`, \`message\`, \`plotSize\`, \`plotType\`, \`sector\`, \`status\`, \`source\`, \`notes\`, \`createdAt\`)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
              \`name\` = VALUES(\`name\`),
              \`phone\` = VALUES(\`phone\`),
              \`message\` = VALUES(\`message\`),
              \`plotSize\` = VALUES(\`plotSize\`),
              \`plotType\` = VALUES(\`plotType\`),
              \`sector\` = VALUES(\`sector\`),
              \`status\` = VALUES(\`status\`),
              \`notes\` = VALUES(\`notes\`);
          `, [
            inq.id,
            inq.name,
            inq.phone,
            inq.email || null,
            inq.message || null,
            inq.plotSize || null,
            inq.plotType || null,
            inq.sector || null,
            inq.status || "New",
            inq.source || "Website Form",
            inq.notes || null,
            inq.createdAt || new Date(),
          ]);
        }
        console.log(`✅ ${store.inquiries.length} Inquiries synced.`);
      }

      // Sync Plots
      if (store.plots && Array.isArray(store.plots)) {
        for (const p of store.plots) {
          await conn.query(`
            INSERT INTO \`plots\` (\`id\`, \`plotNumber\`, \`sector\`, \`category\`, \`type\`, \`totalPrice\`, \`downPayment\`, \`monthlyInst\`, \`status\`, \`features\`, \`image\`, \`createdAt\`)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
              \`plotNumber\` = VALUES(\`plotNumber\`),
              \`sector\` = VALUES(\`sector\`),
              \`category\` = VALUES(\`category\`),
              \`type\` = VALUES(\`type\`),
              \`totalPrice\` = VALUES(\`totalPrice\`),
              \`downPayment\` = VALUES(\`downPayment\`),
              \`monthlyInst\` = VALUES(\`monthlyInst\`),
              \`status\` = VALUES(\`status\`),
              \`features\` = VALUES(\`features\`),
              \`image\` = VALUES(\`image\`);
          `, [
            p.id,
            p.plotNumber,
            p.sector,
            p.category,
            p.type,
            p.totalPrice,
            p.downPayment,
            p.monthlyInst,
            p.status || "Available",
            p.features || "",
            p.image || ".webp",
            p.createdAt || new Date(),
          ]);
        }
        console.log(`✅ ${store.plots.length} Plots synced.`);
      }

      // Sync Blogs
      if (store.blogs && Array.isArray(store.blogs)) {
        for (const b of store.blogs) {
          await conn.query(`
            INSERT INTO \`blogs\` (
              \`id\`, \`slug\`, \`title\`, \`excerpt\`, \`content\`, \`image\`, \`category\`, \`author\`,
              \`readTime\`, \`isPublished\`, \`seoTitle\`, \`metaDescription\`, \`canonicalUrl\`,
              \`robotsIndex\`, \`robotsFollow\`, \`focusKeyword\`, \`secondaryKeywords\`, \`h1Heading\`, \`createdAt\`
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
              \`title\` = VALUES(\`title\`),
              \`excerpt\` = VALUES(\`excerpt\`),
              \`content\` = VALUES(\`content\`),
              \`image\` = VALUES(\`image\`),
              \`category\` = VALUES(\`category\`),
              \`author\` = VALUES(\`author\`),
              \`readTime\` = VALUES(\`readTime\`),
              \`isPublished\` = VALUES(\`isPublished\`),
              \`seoTitle\` = VALUES(\`seoTitle\`),
              \`metaDescription\` = VALUES(\`metaDescription\`),
              \`canonicalUrl\` = VALUES(\`canonicalUrl\`),
              \`robotsIndex\` = VALUES(\`robotsIndex\`),
              \`robotsFollow\` = VALUES(\`robotsFollow\`),
              \`focusKeyword\` = VALUES(\`focusKeyword\`),
              \`secondaryKeywords\` = VALUES(\`secondaryKeywords\`),
              \`h1Heading\` = VALUES(\`h1Heading\`);
          `, [
            b.id,
            b.slug,
            b.title,
            b.excerpt || null,
            b.content || null,
            b.image || ".webp",
            b.category || "General",
            b.author || "Editorial Team",
            b.readTime || "5 min read",
            b.isPublished !== false ? 1 : 0,
            b.seoTitle || null,
            b.metaDescription || null,
            b.canonicalUrl || null,
            b.robotsIndex !== false ? 1 : 0,
            b.robotsFollow !== false ? 1 : 0,
            b.focusKeyword || null,
            b.secondaryKeywords || null,
            b.h1Heading || null,
            b.createdAt || new Date(),
          ]);
        }
        console.log(`✅ ${store.blogs.length} Blogs synced.`);
      }
    }

    console.log("=========================================");
    console.log("🎉 ALL DATABASE TABLES AND SEEDS SYNCED!");
    console.log("=========================================");
    await conn.end();
  } catch (err) {
    console.error("❌ Sync Error:", err.message);
    if (err.code === "ECONNREFUSED") {
      console.log("\n👉 TIP: Ensure MySQL server is running in XAMPP or Windows Service on port 3306.");
    }
  }
}

syncAllToMySQL();
