import mongoose from "mongoose";
import { getConfig } from "../env/env.config.js";

const dbURI = getConfig.get("dbURI");

const DBConnection = async () => {
  try {
    const conn = await mongoose.connect(dbURI);
    console.log(`\n 🍃 Database connected to ${conn.connection.host} 🍃\n`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export { DBConnection };
