import express from "express";
import RegistryController from "../controllers/User/RegistryController";
import GeneralUserController from "../controllers/User/GeneralUserController";
import LoginController from "../controllers/User/LoginController";
import ImageProcessingController from "../controllers/User/ImageProcessingController";
import UserModel from "../models/User/UserModel";

import multer from "multer";

const upload = multer({ dest: "uploads/" });

const router = express.Router();

const userModelInstace = new UserModel();

const imageProcessingController = new ImageProcessingController();
const registryController = new RegistryController(userModelInstace);
const userController = new GeneralUserController();
const loginController = new LoginController(userModelInstace);

router
  .post("/auth/register", registryController.RegisterUser)
  .post("/auth/login", loginController.LoginUser)
  .get("/auth/confirm/email", registryController.confirmEmail)
  .post("/auth/send/confirm/email", registryController.sendVerificationEmail)
  .post(
    "/process/image",
    upload.single("image"),
    imageProcessingController.processImage
  );
//  .get("/user", userController.getProfile)
// .put("/user", userController.updateProfile)
// .delete("/user", userController.deleteProfile);

export default router;
