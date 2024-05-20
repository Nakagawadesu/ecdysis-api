import { ObjectId } from "mongodb";
export type UserType = {
  _id?: ObjectId;
  accountData: AccountData;
  skinQualityReports: Array<ObjectId>;
  skinQualityReportsCount?: number;
  SkinHealthReports: Array<ObjectId>;
  SkinHealthReportsCount?: number;
  Metrics?: UserMetricsType;
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
  mediumPimplesScore: number;
  mediumwrikelsScore: number;
  mediumGreaseScore: number;
  HighestPimplesScore: number;
  HighestWrikelsScore: number;
  HighestGreaseScore: number;
  LowestPimplesScore: number;
  LowestWrikelsScore: number;
  LowestGreaseScore: number;
  HealthIssues: Array<string>;
};
