import express from "express";
import RegistryController from "../controllers/User/RegistryController";
import GeneralUserController from "../controllers/User/GeneralUserController";
import LoginController from "../controllers/User/LoginController";
import UserModel from "../models/User/UserModel";

const router = express.Router();

const userModelInstace = new UserModel();

const registryController = new RegistryController(userModelInstace);
const userController = new GeneralUserController();
const loginController = new LoginController(userModelInstace);

router
  .post("/auth/register", registryController.RegisterUser)
  .post("/auth/login", loginController.LoginUser)
  .get("/auth/confirm/email", registryController.confirmEmail)
  .post("/auth/send/confirm/email", registryController.sendVerificationEmail);
// .get("/user", userController.getProfile)
// .put("/user", userController.updateProfile)
// .delete("/user", userController.deleteProfile);

export default router;
