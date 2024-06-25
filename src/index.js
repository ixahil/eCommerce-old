import { DBConnection, getConfig } from "./config/index.js";
import app from "./app.js";
const port = getConfig.get("port");
const startServer = () => {
  app.listen(port, () => {
    console.log(" ⚙️  Server listening on: " + port);
  });
};

try {
  await DBConnection();
  startServer();
} catch (error) {
  console.log("MongoDB error: " + error);
  process.exit(1);
}
