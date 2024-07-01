import Logger from "../../helpers/Logger";
import {
  OptionalId,
  ObjectId,
  Collection,
  MongoClient,
  Document,
} from "mongodb";
import Database from "../../config/Database";
import { UserType, AccountData } from "../../types/UserType";
import dotenv from "dotenv";
import { resolve } from "path";
dotenv.config();

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
    this.connectToCollection();
  }
  private createIndexes = async () => {
    try {
      await this.collection.createIndex(
        { "accountData.email": 1 },
        { unique: true }
      );
    } catch (error) {
      log.error(`Error creating indexes: ${error}`);
      throw error;
    }
  };
  private connectToCollection = async () => {
    try {
      this.client = await this.client.connect();
    } catch (error) {
      throw error;
    }
    try {
      this.collection = this.client
        .db(this.databaseName)
        .collection(this.collectionName);

      this.createIndexes();
      log.info(`Connected to collection ${this.collectionName}`);
    } catch (error) {
      log.error(`error connecting to collection ${this.collectionName}`);
      throw error;
    }
  };

  public createUser = async (user: UserType) => {
    log.group(`Create User at UserModel Level`);
    try {
      const response = await this.collection.insertOne(user);
      log.groupEnd();
      return response;
    } catch (error) {
      log.error(`Error creating user ${error}`);

      log.groupEnd();
      return error;
    }
  };
  public readUserById = async (userId: string) => {
    log.group(`Get User by Id at UserModel Level`);
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
  public readUserByEmail = async (email: string) => {
    log.group(`Get User by Email at UserModel Level`);
    log.info(`Email: ${email}`);
    try {
      const user = await this.collection.findOne({
        "accountData.email": email,
      });
      log.info(`User: ${JSON.stringify(user)}`);
      log.groupEnd();
      return user;
    } catch {
      log.error(`Error getting user by email ${email}`);

      log.groupEnd();
      return null;
    }
  };
  public updateUser = async (userId: string, user: UserType) => {
    log.group(`Update User  at UserModel Level`);
    try {
      const response = await this.collection.updateOne(
        { _id: new ObjectId(userId) },
        { $set: user }
      );
      log.groupEnd();
      return response;
    } catch (error) {
      log.error(`Error creating user`);

      log.groupEnd();
      return error;
    }
  };
  public deleteUserById = async (userId: string) => {
    log.group(`Delete User by  Id at UserModel Level`);
    try {
      const response = await this.collection.deleteOne({
        _id: new ObjectId(userId),
      });
      log.groupEnd();
      return response;
    } catch (error) {
      log.error(`Error creating user`);

      log.groupEnd();
      return error;
    }
  };
  public deleteUserByEmail = async (email: string) => {
    log.group(`Delete User by Email at UserModel Level`);
    try {
      const response = await this.collection.deleteOne({
        "accountData.email": email,
      });
      log.groupEnd();
      return response;
    } catch (error) {
      log.error(`Error creating user`);

      log.groupEnd();
      return error;
    }
  };

  public verifyEmail = async (userId: string) => {
    log.group(`Verify Email at UserModel Level`);
    try {
      const response = await this.collection.updateOne(
        { _id: new ObjectId(userId) },
        { $set: { "accountData.emailVerified": true } }
      );
      log.groupEnd();
      return response;
    } catch (error) {
      log.error(`Error cVeryfing email ${error}`);

      log.groupEnd();
      return error;
    }
  };
  public isEmailVerified = async (email: string) => {
    log.group(`Is Email Verified at UserModel Level`);
    try {
      const user = await this.collection.findOne({
        "accountData.email": email,
      });
      log.groupEnd();
      return user?.accountData.emailVerified;
    } catch (error) {
      log.error(`Error identifying if email is veryfied ${error}`);

      log.groupEnd();
      return error;
    }
  };
}

export default UserModel;
