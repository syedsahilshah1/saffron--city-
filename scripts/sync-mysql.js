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

    // Read database.sql file
    const sqlPath = path.join(__dirname, "..", "database.sql");
    if (!fs.existsSync(sqlPath)) {
      throw new Error(`database.sql not found at ${sqlPath}`);
    }

    const sqlContent = fs.readFileSync(sqlPath, "utf-8");
    console.log("Running SQL migrations from database.sql...");
    await connection.query(sqlContent);
    console.log("✅ Database schema and all tables restored successfully in MySQL!");
    console.log("=========================================");
    console.log("🎉 ALL TABLES & SEEDS CREATED IN MYSQL!");
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
