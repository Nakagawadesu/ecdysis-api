import Logger from "../../helpers/Logger";
import {
  OptionalId,
  ObjectId,
  Collection,
  MongoClient,
  Document,
} from "mongodb";
import Database from "../../config/Database";
import { UserType, AccountData, UserMetricsType } from "../../types/UserType";
import { resolve } from "path";
const log = new Logger();

class UserModel {
  private client!: MongoClient;
  private collection: Collection<Document>;
  private databaseName = process.env.MONGO_DB_NAME;
  private collectionName = "users";

  constructor() {
    const databaseInstance = Database.getInstance();
    if (databaseInstance) {
      this.client = databaseInstance.getClient();
    }
    this.client.connect();
    this.collection = this.client
      .db(this.databaseName)
      .collection(this.collectionName);
  }

  private connectToCollection = async () => {
    try {
      this.client = await this.client.connect();
      log.info(`Connected to database ${this.databaseName}`);
    } catch (error) {
      log.error(`error connecting to database ${this.databaseName}`);
      throw error;
    }
    try {
      this.collection = this.client
        .db(this.databaseName)
        .collection(this.collectionName);
      log.info(`Connected to collection ${this.collectionName}`);
    } catch {
      log.error(`error connecting to collection ${this.collectionName}`);
    }
  };

  public createUser = async (user: UserType) => {
    log.group(`Create User Controller`);
    try {
      const response = await this.collection.insertOne(user);
      log.groupEnd();
      return response;
    } catch {
      log.error(`Error creating user`);

      log.groupEnd();
      return null;
    }
  };
  public readUser = async (userId: string) => {
    log.group(`Get User Controller`);
    try {
      const user = await this.collection.findOne({ _id: new ObjectId(userId) });
      log.groupEnd();
      return user;
    } catch {
      log.error(`Error getting user`);

      log.groupEnd();
      return null;
    }
  };
  public updateUser = async (userId: string, user: UserType) => {
    log.group(`Update User Controller`);
    try {
      const response = await this.collection.updateOne(
        { _id: new ObjectId(userId) },
        { $set: user }
      );
      log.groupEnd();
      return response;
    } catch {
      log.error(`Error updating user`);

      log.groupEnd();
      return null;
    }
  };
  public deleteUser = async (userId: string) => {
    log.group(`Delete User Controller`);
    try {
      const response = await this.collection.deleteOne({
        _id: new ObjectId(userId),
      });
      log.groupEnd();
      return response;
    } catch {
      log.error(`Error deleting user`);

      log.groupEnd();
      return null;
    }
  };
}

export default UserModel;
