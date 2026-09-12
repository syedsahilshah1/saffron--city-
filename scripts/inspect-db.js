const mysql = require("mysql2/promise");

async function inspectAll() {
  const conn = await mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "saffron_city",
  });

  const [tables] = await conn.query("SHOW TABLES;");
  const tableList = tables.map((t) => Object.values(t)[0]);
  console.log("=== ALL TABLES IN saffron_city ===");
  console.log(tableList);

  for (const name of tableList) {
    const [cols] = await conn.query(`DESCRIBE \`${name}\``);
    const [count] = await conn.query(`SELECT COUNT(*) as c FROM \`${name}\``);
    console.log(`\nTable: [${name}] (${count[0].c} rows)`);
    console.log("Columns:", cols.map(c => c.Field).join(", "));
  }

  await conn.end();
}

inspectAll();
