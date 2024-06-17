import { ObjectId } from "mongodb";
export type UserType = {
  _id?: ObjectId;
  accountData: AccountData;
  SkinHealthReports?: Array<ObjectId>;
  SkinHealthReportsCount?: number;
};
export type AccountData = {
  username: string;
  email: string;
  phone?: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
  birthdate?: Date;
};
export type UserMetricsType = {
  Age?: number;
  HealthIssues: Array<string>;
};
