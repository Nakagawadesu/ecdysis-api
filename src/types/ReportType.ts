import { ObjectId } from "mongodb";
import { string } from "yargs";

export type ReportType = {
  _id?: ObjectId;
  user: ObjectId;
  reportType: "skinQuality" | "skinHealth";
  createdAt: Date;
  title?: string;
  description?: string;
  greaseScore?: number;
  deseaseClass?: ObjectId;
  confidence?: number;
  imageUrl?: string;
};
