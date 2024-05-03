import { ObjectId } from "mongodb";
import { string } from "yargs";

type ReportType = {
  _id?: ObjectId;
  user: ObjectId;
  reportType: "skinQuality" | "skinHealth";
  createdAt: Date;
  title?: string;
  description?: string;
  pimlesScore?: number;
  wrikelsScore?: number;
  greaseScore?: number;
  deseaseClass?: ObjectId;
  confidence?: number;
  imageUrl?: string;
};
