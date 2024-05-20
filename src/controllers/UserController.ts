import UserModel from "../models/UserModel";
import { Request, Response, NextFunction } from "express";
import Logger from "../helpers/Logger";
import { UserType } from "../types/UserType";
const log = new Logger();
class UserController {
  private userModel!: UserModel;

  constructor() {
    this.userModel = new UserModel();
  }
  public createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    log.info("Create User Controller");
    const user: UserType = req.body;
    log.info("User data: ", user);
    try {
      await this.userModel.createUser(user);
    } catch {}
  };
}

export default UserController;
