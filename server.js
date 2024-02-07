const dotenv = require("dotenv");
const app = require("./app");

dotenv.config({ path: "./config.env" });

const server = app.listen(3000, () => {
  console.log("App running on port 3000...");
});
