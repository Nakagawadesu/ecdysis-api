import { Request, Response, NextFunction } from "express";

class ResponseHandler {
  static handle(req: Request, res: Response, next: NextFunction) {
    if (!req.statusCode) {
      req.statusCode = 500;
      req.statusMessage = "Invalid URL";
    }
    if (!req.statusMessage) {
      req.statusMessage = "An error occurred";
    }
    return res.status(req.statusCode).send(req.statusMessage);
  }
}

export default ResponseHandler;
