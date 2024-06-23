import { Request, NextFunction } from "express";
import { AssemblerPayload } from "../types/PayloadType";
import Logger from "../helpers/Logger";
const log = new Logger();
class requestAssembler {
  static assembleRequest(
    req: Request,
    next: NextFunction,
    payload: AssemblerPayload
  ) {
    if (payload.status == 500) {
      payload.log ? log.error(payload.log) : null;
      req.statusCode = payload.status;
      req.statusMessage = payload.message;

      log.groupEnd();
      return next();
    } else if (payload.status >= 300 && payload.status < 500) {
      payload.log ? log.warning(payload.log) : null;
      req.statusCode = payload.status;
      req.statusMessage = payload.message;

      log.groupEnd();
      return next();
    } else {
      payload.log ? log.info(payload.log) : null;
      req.statusCode = payload.status;
      req.statusMessage = payload.message;
      req.body = payload.body;

      log.groupEnd();
      return next();
    }
  }
}
export default requestAssembler;
