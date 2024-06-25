import fs from "fs";
import * as tf from "@tensorflow/tfjs-node";
import path from "path";
import { URL } from "url";

const modelPath = path.resolve(
  "/home/matheus/Projects/ecdysis-api/src/CNN/modeloCNN.h5"
);
export const loadModel = async (model: any | null) => {
  if (!model) {
    if (fs.existsSync(modelPath)) {
      const modelUrl = new URL(`file://${modelPath}`);
      model = await tf.loadLayersModel(modelUrl.toString());
      return model;
    } else {
      throw new Error("Model path doesn't exist");
    }
  }
};
