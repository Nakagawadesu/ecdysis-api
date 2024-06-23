import HttpStatusCode from "../utils/HttpStatusCode";

export type AssemblerPayload = {
  status: HttpStatusCode;
  message: string;
  log?: string;
  body?: any;
};
