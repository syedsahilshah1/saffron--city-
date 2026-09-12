const { db } = require("../src/lib/db");

async function test() {
  console.log("Testing direct DB authentication on user's live saffron_city MySQL database...");
  const res = await db.authenticateUser("ubaidnasir401@gmail.com", "ubaidnasir401@gmail.com");
  console.log("Authentication Result:", res);

  const plots = await db.getPlots();
  console.log("Total Plots in DB:", plots.length);

  const blogs = await db.getBlogs();
  console.log("Total Blogs in DB:", blogs.length);

  const settings = await db.getSettings();
  console.log("Site Title from DB:", settings.siteName);
}

test();
