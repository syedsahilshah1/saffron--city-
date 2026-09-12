import mysql, { Pool } from "mysql2/promise";

let pool: Pool | null = null;
let isConnected = false;

export function getMySQLPool(): Pool | null {
  if (pool) return pool;

  try {
    const host = process.env.MYSQL_HOST || "127.0.0.1";
    const port = Number(process.env.MYSQL_PORT) || 3306;
    const user = process.env.MYSQL_USER || "root";
    const password = process.env.MYSQL_PASSWORD || "";
    const database = process.env.MYSQL_DATABASE || "saffroncity";

    pool = mysql.createPool({
      host,
      port,
      user,
      password,
      database,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      connectTimeout: 4000,
    });

    return pool;
  } catch (err) {
    console.warn("[MySQL Pool Error]:", err);
    return null;
  }
}

export async function testMySQLConnection(): Promise<boolean> {
  const p = getMySQLPool();
  if (!p) return false;
  try {
    const [rows] = await p.query("SELECT 1 + 1 AS solution");
    isConnected = true;
    return true;
  } catch (err: any) {
    isConnected = false;
    return false;
  }
}

export async function initializeMySQLSchema(): Promise<boolean> {
  const p = getMySQLPool();
  if (!p) return false;

  try {
    // 1. Users table
    await p.query(`
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

    // 2. Inquiries / Leads table
    await p.query(`
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

    // 3. Blogs table
    await p.query(`
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

    // 4. Settings table
    await p.query(`
      CREATE TABLE IF NOT EXISTS settings (
        id INT PRIMARY KEY DEFAULT 1,
        data JSON NOT NULL,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    console.log("[MySQL Schema] Tables initialized successfully in 'saffroncity' database.");
    return true;
  } catch (err: any) {
    console.error("[MySQL Schema Init Error]:", err?.message);
    return false;
  }
}
