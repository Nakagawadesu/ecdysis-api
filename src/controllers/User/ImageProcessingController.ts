import { Request, Response, NextFunction } from "express";
import requestAssembler from "../../services/RequestAssembler";
import Logger from "../../helpers/Logger";
import HttpStatusCode from "../../utils/HttpStatusCode";
import { ClassifyImage } from "../../services/ImageClassifier";
import ModelLoader from "../../CNN/modelLoader";
import { classesEnum } from "../../CNN/classes";
type ClassIndex = keyof typeof classesEnum;
const log = new Logger();
const modelLoader = new ModelLoader();

class ImageProcessingController {
  public async processImage(req: Request, res: Response, next: NextFunction) {
    log.group("ImageProcessingController");
    try {
      console.log(req.file);
      log.success(`req.body ${JSON.stringify(req.body)}  `);
      if (!req.file) {
        const payload = {
          status: HttpStatusCode.BAD_REQUEST,
          message: "Nenhum Arquivo enviado",
          log: "No file uploaded",
        };

        log.groupEnd();
        return requestAssembler.assembleRequest(req, next, payload);
      }
      log.success(` req.file.path: ${req.file.path}`);
      const result = await ClassifyImage(req.file.path, modelLoader);
      log.success(`Result: ${JSON.stringify(result)}`);
      const payload = {
        status: HttpStatusCode.OK,
        message: "Imagem processada com sucesso",
        log: `Predicted class: ${classesEnum[result as ClassIndex]}`,
        body: result,
      };
      log.groupEnd();
      return requestAssembler.assembleRequest(req, next, payload);
    } catch (error) {
      log.groupEnd();
      const payload = {
        status: HttpStatusCode.INTERNAL_SERVER_ERROR,
        message: "Erro ao processar a imagem",
        log: `Error: ${error}`,
      };
      return requestAssembler.assembleRequest(req, next, payload);
    }
  }
}
export default ImageProcessingController;
