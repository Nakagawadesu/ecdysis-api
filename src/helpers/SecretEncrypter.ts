import crypto from "crypto";
import Logger from "./Logger";
import dotenv from "dotenv";
dotenv.config();
const log = new Logger();
const { SECRET_KEY, SECRET_IV, ENCRYPTION_METHOD } = process.env;
if (!SECRET_KEY || !SECRET_IV || !ENCRYPTION_METHOD) {
  throw new Error("SECRET_KEY, SECRET_IV, and ENCRYPTION_METHOD are required");
}

class SecretEncrypter {
  private key: string;
  private encryptionIV: string;
  public constructor() {
    this.key = crypto
      .createHash("sha512")
      .update(process.env.SECRET_KEY as string)
      .digest("hex")
      .substring(0, 32);
    this.encryptionIV = crypto
      .createHash("sha512")
      .update(process.env.SECRET_IV as string)
      .digest("hex")
      .substring(0, 16);
  }

  public encryptData(data: string) {
    try {
      const cipher = crypto.createCipheriv(
        process.env.ENCRYPTION_METHOD as string,
        this.key,
        this.encryptionIV
      );
      return Buffer.from(
        cipher.update(data, "utf8", "hex") + cipher.final("hex")
      ).toString("base64");
    } catch (error) {
      throw new Error("Invalid data format");
    }
  }

  public decryptData(encryptedData: string) {
    log.group("decryptData function");
    try {
      log.success(process.env.ENCRYPTION_METHOD, "ENCRYPTION_METHOD");

      if (!encryptedData) {
        throw new Error("encryptedData is undefined");
      }
      log.success(encryptedData, "encryptedData");

      const buff = Buffer.from(encryptedData, "base64");

      if (!buff) {
        throw new Error("Buffer creation failed");
      }
      const decipher = crypto.createDecipheriv(
        process.env.ENCRYPTION_METHOD as string,
        this.key,
        this.encryptionIV
      );
      log.success("Decipher created");
      log.success(buff.toString("utf8"), "hex", "utf8");
      log.groupEnd();
      return (
        decipher.update(buff.toString("utf8"), "hex", "utf8") +
        decipher.final("utf8")
      );
    } catch (error) {
      log.error("Error decrypting data", error);
      throw new Error("Invalid data format");
    }
  }
}
export default SecretEncrypter;
