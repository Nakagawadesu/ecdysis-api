import Logger from "../helpers/Logger";
import fs from "fs";
const log = new Logger();
import ModelLoader from "../CNN/modelLoader";
import { classesEnum } from "../CNN/classes";
import * as tf from "@tensorflow/tfjs-node";

type ClassIndex = keyof typeof classesEnum;

export const ClassifyImage = async (
  imagePath: string,
  modelLoaderinstance: ModelLoader
) => {
  log.group("ClassifyImage");
  if (!modelLoaderinstance.model) {
    log.error("Model not loaded");
    return;
  }
  try {
    const imgArray = await modelLoaderinstance.preProcessImage(imagePath);
    const predictions = modelLoaderinstance.model.predict(
      imgArray
    ) as tf.Tensor;
    const predictedClass = predictions.argMax(-1).dataSync()[0];

    fs.unlinkSync(imagePath);
    const result = predictedClass;
    log.success(
      `Predicted class: ${classesEnum[predictedClass as ClassIndex]}`
    );
    return result;
  } catch (error) {
    log.error(error);
    return error;
  }
};
