import Logger from "../helpers/Logger";
import fs from "fs";
const log = new Logger();
import { loadModel } from "../CNN/modelLoader";
import { preprocessImage } from "../CNN/preProcessor";
import { classesEnum } from "../CNN/classes";
import * as tf from "@tensorflow/tfjs-node";

type ClassIndex = keyof typeof classesEnum;

// instanciar uam classe utilizando o padrão singleton
//let model: tf.LayersModel | null = null;
export const ClassifyImage = async (file: Express.Multer.File) => {
  try {
    log.group("ClassifyImage");
    const image = fs.readFileSync(file.path);
    console.log(`file.filename ${file.filename} , file.path ${file.path}`);
    if (!image) {
      throw new Error("Error no image created in /Uploads");
    }
    log.info("Image loaded successfully");
    const model = await loadModel(null);
    if (!model) {
      throw new Error("Error loading model");
    }
    log.info("Model loaded successfully");
    const tensor = await preprocessImage(file.path);
    log.info("Image preprocessed successfully");
    const predictions = await model.predict(tensor);
    log.info("Model predicted successfully");
    const predictedClassIndex = predictions
      .argMax(-1)
      .dataSync()[0] as ClassIndex;
    const predictedClass = classesEnum[predictedClassIndex];

    console.log(`Predicted class is: ${predictedClass}`);
    fs.unlinkSync(file.path);
    log.groupEnd();
    return predictedClass;
  } catch (error) {
    log.error(error);
    return error;
  }
};
