import { MongoClient, ServerApiVersion } from "mongodb";
import mongodb from "mongodb";
import dotenv from "dotenv";
import Logger from "../helpers/Logger";

dotenv.config();
const log = new Logger();

class Database {
  private static instance: Database;
  private client!: mongodb.MongoClient;
  private databaseName = process.env.MONGO_DB_NAME ?? "";
  private db: mongodb.Db | undefined;

  public constructor() {
    try {
      this.databaseName = process.env.MONGO_DB_NAME ?? "";
      this.client = new MongoClient(process.env.MONGO_STRING ?? "", {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        },
      });
      log.success("MongoClient initialized");
    } catch (err) {
      log.error("Error in Database constructor: ", err);
      log.info("MongoClient initialized");
      log.info(
        `Database name: ${process.env.MONGO_DB_NAME}, Connection string: ${process.env.MONGO_STRING}`
      );
    }
  }

  static getInstance(): Database | null {
    try {
      if (!Database.instance) {
        Database.instance = new Database();

        log.info("Database instance created");
      }
      log.success("Database instance returned");
      return Database.instance;
    } catch (err) {
      log.error("Error in Database.getInstance: ", err);
      return null;
    }
  }

  async connect() {
    try {
      await this.client.connect();
      this.db = this.client.db(this.databaseName);
      log.success("Connected to database");
    } catch (err) {
      log.error("Error in Database.connect: ", err);
    }
  }

  async close() {
    await this.client.close();
    log.info("Database connection closed");
  }

  getClient(): MongoClient {
    return this.client;
  }
}
export default Database;
