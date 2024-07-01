import fs from "fs";
import * as tf from "@tensorflow/tfjs-node";
import path from "path";
import Logger from "../helpers/Logger";
const log = new Logger();
const modelDir = path.resolve(
  "/home/matheus/Projects/ecdysis-api/src/CNN/tfjs_model"
);
class ModelLoader {
  public model: tf.LayersModel | null = null;

  public constructor() {
    this.loadModel().then((model) => {
      this.model = model;
    });
  }
  public loadModel = async (
    model: tf.LayersModel | null = null
  ): Promise<tf.LayersModel> => {
    const modelPath = path.join(modelDir, "model.json");

    if (!model) {
      if (fs.existsSync(modelPath)) {
        try {
          model = await tf.loadLayersModel(`file://${modelPath}`);
          console.log("Model loaded successfully");
          return model;
        } catch (error) {
          log.error(`Error loading model: ${error}`);
        }
      } else {
        throw new Error("Model path doesn't exist");
      }
    }

    // If model is already loaded, return it
    return model!;
  };
  public preProcessImage = async (imagePath: string) => {
    const imageBuffer = fs.readFileSync(imagePath);
    const tensor = tf.node
      .decodeImage(imageBuffer, 3)
      .resizeNearestNeighbor([224, 224]) // Change the image size here
      .expandDims()
      .toFloat();
    return tensor;
  };
}

export default ModelLoader;
