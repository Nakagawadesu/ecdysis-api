import { Request, Response, NextFunction } from "express";
import requestAssembler from "../../services/RequestAssembler";
import Logger from "../../helpers/Logger";
import HttpStatusCode from "../../utils/HttpStatusCode";
const log = new Logger();
import { ClassifyImage } from "../../services/ImageClassifier";
class ImageProcessingController {
  public async processImage(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.file);
      if (!req.file) {
        const payload = {
          status: HttpStatusCode.BAD_REQUEST,
          message: "Nenhum Arquivo enviado",
          log: "No file uploaded",
        };
        return requestAssembler.assembleRequest(req, next, payload);
      }
      ClassifyImage(req.file);
      return res.status(HttpStatusCode.OK);
    } catch (error) {
      next(error);
    }
  }
}
export default ImageProcessingController;
