const mysql = require("mysql2/promise");
const fs = require("fs");
const path = require("path");

async function syncToMySQL() {
  console.log("-----------------------------------------");
  console.log("🚀 Saffron City - MySQL Sync Script");
  console.log("-----------------------------------------");

  const config = {
    host: process.env.MYSQL_HOST || "127.0.0.1",
    port: Number(process.env.MYSQL_PORT) || 3306,
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "",
  };

  try {
    // 1. Connect to MySQL server
    console.log(`Connecting to MySQL on ${config.host}:${config.port} (user: ${config.user})...`);
    const connection = await mysql.createConnection(config);
    console.log("✅ Connected to MySQL server!");

    // 2. Ensure database exists
    const dbName = process.env.MYSQL_DATABASE || "saffroncity";
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
    console.log(`✅ Database \`${dbName}\` verified / created.`);
    await connection.query(`USE \`${dbName}\`;`);

    // 3. Create Tables
    console.log("Creating tables...");
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(100) PRIMARY KEY,
        email VARCHAR(191) UNIQUE NOT NULL,
        name VARCHAR(191) NOT NULL,
        passwordHash VARCHAR(255) NOT NULL,
        salt VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL DEFAULT 'VIEWER',
        permissions JSON NOT NULL,
        failedAttempts INT DEFAULT 0,
        lockedUntil DATETIME NULL,
        isActive BOOLEAN DEFAULT TRUE,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        lastLoginAt DATETIME NULL,
        sessionToken VARCHAR(500) NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS inquiries (
        id VARCHAR(100) PRIMARY KEY,
        name VARCHAR(191) NOT NULL,
        phone VARCHAR(100) NOT NULL,
        email VARCHAR(191) NULL,
        message TEXT NULL,
        plotSize VARCHAR(100) NULL,
        plotType VARCHAR(100) NULL,
        sector VARCHAR(100) NULL,
        status VARCHAR(50) DEFAULT 'New',
        source VARCHAR(100) DEFAULT 'Website Form',
        notes TEXT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS blogs (
        id VARCHAR(100) PRIMARY KEY,
        slug VARCHAR(191) UNIQUE NOT NULL,
        title VARCHAR(255) NOT NULL,
        excerpt TEXT NULL,
        content LONGTEXT NULL,
        category VARCHAR(100) NOT NULL,
        tags JSON NOT NULL,
        featuredImage VARCHAR(500) NOT NULL,
        bannerImage VARCHAR(500) NULL,
        authorName VARCHAR(191) NOT NULL,
        authorRole VARCHAR(191) NOT NULL,
        authorAvatar VARCHAR(500) NOT NULL,
        status VARCHAR(50) DEFAULT 'published',
        featured BOOLEAN DEFAULT FALSE,
        views INT DEFAULT 0,
        readingTime VARCHAR(50) NOT NULL,
        seoTitle VARCHAR(255) NULL,
        seoDescription TEXT NULL,
        publishedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    console.log("✅ Tables created successfully.");

    // 4. Populate from cms_store.json
    const storePath = path.join(__dirname, "..", "data", "cms_store.json");
    if (fs.existsSync(storePath)) {
      const raw = fs.readFileSync(storePath, "utf-8");
      const store = JSON.parse(raw);

      if (store.users && store.users.length > 0) {
        console.log(`Syncing ${store.users.length} users...`);
        for (const u of store.users) {
          await connection.query(
            `INSERT INTO users (id, email, name, passwordHash, salt, role, permissions, failedAttempts, isActive, createdAt)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE
               name = VALUES(name),
               passwordHash = VALUES(passwordHash),
               salt = VALUES(salt),
               role = VALUES(role),
               permissions = VALUES(permissions),
               isActive = VALUES(isActive);`,
            [
              u.id,
              u.email,
              u.name,
              u.passwordHash,
              u.salt,
              u.role,
              JSON.stringify(u.permissions || []),
              u.failedAttempts || 0,
              u.isActive ?? true,
              new Date(u.createdAt || Date.now()),
            ]
          );
        }
        console.log("✅ Users synced.");
      }

      if (store.inquiries && store.inquiries.length > 0) {
        console.log(`Syncing ${store.inquiries.length} inquiries...`);
        for (const inq of store.inquiries) {
          await connection.query(
            `INSERT INTO inquiries (id, name, phone, email, message, plotSize, plotType, sector, status, source, notes, createdAt)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE
               name = VALUES(name),
               phone = VALUES(phone),
               status = VALUES(status),
               notes = VALUES(notes);`,
            [
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
              new Date(inq.createdAt || Date.now()),
            ]
          );
        }
        console.log("✅ Inquiries synced.");
      }

      if (store.blogs && store.blogs.length > 0) {
        console.log(`Syncing ${store.blogs.length} blogs...`);
        for (const b of store.blogs) {
          await connection.query(
            `INSERT INTO blogs (id, slug, title, excerpt, content, category, tags, featuredImage, bannerImage, authorName, authorRole, authorAvatar, status, featured, views, readingTime, seoTitle, seoDescription, publishedAt, createdAt)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE
               title = VALUES(title),
               excerpt = VALUES(excerpt),
               content = VALUES(content),
               featuredImage = VALUES(featuredImage),
               status = VALUES(status);`,
            [
              b.id,
              b.slug,
              b.title,
              b.excerpt || null,
              b.content || null,
              b.category,
              JSON.stringify(b.tags || []),
              b.featuredImage,
              b.bannerImage || null,
              b.authorName,
              b.authorRole,
              b.authorAvatar,
              b.status || "published",
              b.featured ? 1 : 0,
              b.views || 0,
              b.readingTime || "5 min read",
              b.seoTitle || null,
              b.seoDescription || null,
              new Date(b.publishedAt || Date.now()),
              new Date(b.createdAt || Date.now()),
            ]
          );
        }
        console.log("✅ Blogs synced.");
      }
    }

    console.log("-----------------------------------------");
    console.log("🎉 ALL DATA SYNCED TO MYSQL SUCCESSFULLY!");
    console.log("-----------------------------------------");
    await connection.end();
  } catch (err) {
    console.error("❌ MySQL Sync Error:", err.message);
    if (err.code === "ECONNREFUSED" || err.code === "ETIMEDOUT") {
      console.log("\n👉 TIP: Please open XAMPP Control Panel and click 'Start' next to MySQL.");
    }
  }
}

syncToMySQL();
