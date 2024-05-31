import UserModel from "../models/UserModel";
import { Request, Response, NextFunction } from "express";
import Logger from "../helpers/Logger";
import { UserType } from "../types/UserType";
import Filter from "../helpers/Filter";
import { userFields } from "../helpers/Filter";
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
    const body = req.body;
    const missingFields = Filter.filterFields(userFields, body);
    if (missingFields) {
      req.statusCode = 400;
      req.statusMessage = `${
        missingFields.length > 1
          ? "existem campos faltando :"
          : "existe um campo faltando :"
      } 
    ${missingFields.join(", ")}`;
      log.groupEnd();
      next();
    }
    const user: UserType = {
      name: body.name,
      accountData: {
        name: body.name,
        email: body.email,
        password: body.password,
      },
      email: body.email,
      password: body.password,
    };
    try {
      const res = await this.userModel.createUser(user);
      if (!res) {
        req.statusCode = 500;
        req.statusMessage = "Error creating user";
        log.groupEnd();
        next();
      }
      req.statusCode = 200;
      req.statusMessage = "User created successfully";
      log.groupEnd();
      next();
    } catch {
      req.statusCode = 500;
      req.statusMessage = "Error creating user";
      log.groupEnd();
      next();
    }
  };
}

export default UserController;
