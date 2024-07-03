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
    const response = {
      message: req.statusMessage,
      payload: req.body,
    };
    console.log(
      `Response: ${JSON.stringify(response.message)} , statusCode: ${
        req.statusCode
      }`
    );
    return res.status(req.statusCode).send(response);
  }
}

export default ResponseHandler;
