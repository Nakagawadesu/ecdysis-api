import { Image } from "image-js";
import tf from "@tensorflow/tfjs-node";
export const preprocessImage = async (imagePath: string) => {
  const img = await Image.load(imagePath);
  const resized = img.resize({ width: 224, height: 224 });
  const imgArray = resized.data; // Get the image data as a Uint8Array
  const tensor = tf
    .tensor4d(Array.from(imgArray), [1, 224, 224, 3], "float32")
    .div(255.0); // Normalize to [0, 1]
  return tensor;
};
