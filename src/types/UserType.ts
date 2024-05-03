import { ObjectId } from "mongodb";
type UserType = {
  _id?: ObjectId;
  accountData: AccountData;
  skinQualityReports: Array<ObjectId>;
  skinQualityReportsCount?: number;
  SkinHealthReports: Array<ObjectId>;
  SkinHealthReportsCount?: number;
  Metrics?: UserMetricsType;
};
type AccountData = {
  username: string;
  email: string;
  phone?: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
  birthdate?: Date;
};
type UserMetricsType = {
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
