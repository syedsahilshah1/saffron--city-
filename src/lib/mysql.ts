import mysql, { Pool } from "mysql2/promise";
import fs from "fs";
import path from "path";

let pool: Pool | null = null;

export function getMySQLPool(): Pool {
  if (pool) return pool;

  const host = process.env.MYSQL_HOST || "127.0.0.1";
  const port = Number(process.env.MYSQL_PORT) || 3306;
  const user = process.env.MYSQL_USER || "root";
  const password = process.env.MYSQL_PASSWORD || "";
  const database = process.env.MYSQL_DATABASE || "saffron_city";

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
    multipleStatements: true,
  });

  return pool;
}

export async function query<T = any>(sql: string, params: any[] = []): Promise<T> {
  const p = getMySQLPool();
  const [results] = await p.query(sql, params);
  return results as T;
}

export async function testMySQLConnection(): Promise<boolean> {
  try {
    const p = getMySQLPool();
    await p.query("SELECT 1 + 1 AS solution");
    return true;
  } catch {
    return false;
  }
}

export async function runDatabaseMigrations(): Promise<boolean> {
  try {
    const p = getMySQLPool();
    const sqlPath = path.join(process.cwd(), "database.sql");
    if (fs.existsSync(sqlPath)) {
      const sql = fs.readFileSync(sqlPath, "utf-8");
      await p.query(sql);
      console.log("[MySQL] Schema & seeds successfully imported from database.sql");
      return true;
    }
    return false;
  } catch (err: any) {
    console.error("[MySQL Migration Error]:", err?.message);
    return false;
  }
}
