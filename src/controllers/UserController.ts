import UserModel from "../models/User/UserModel";
import { Request, Response, NextFunction } from "express";
import Logger from "../helpers/Logger";
import { UserType } from "../types/UserType";
import Filter from "../helpers/Filter";
import { userFields } from "../helpers/Filter";
import RegexHandler from "../helpers/RegexHandler";
import Encrypter from "../helpers/bcrypter";
const log = new Logger();

class UserController {
  private userModel!: UserModel;

  constructor() {
    this.userModel = new UserModel();
  }
  public RegisterUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    log.info("Create User Controller");

    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;

    const missingFields = Filter.filterFields(userFields, req.body);
    if (missingFields) {
      req.statusCode = 400;
      req.statusMessage = `${
        missingFields.length > 1
          ? "existem campos faltando :"
          : "existe um campo faltando :"
      } 
    ${missingFields.join(", ")}`;
      log.groupEnd();
      return next();
    }

    //check Regex on inputs
    if (!RegexHandler.isEmailValid(email)) {
      req.statusCode = 400;
      req.statusMessage = "Email inválido";
      log.groupEnd();
      return next();
    }
    if (!RegexHandler.isPasswordValid(password)) {
      req.statusCode = 400;
      req.statusMessage = "Senha inválida";
      log.groupEnd();
      return next();
    }

    const user: UserType = {
      accountData: {
        username: username,
        email: email,
        password: password,
      },
    };
    try {
      const res = await this.userModel.createUser(user);
      if (!res) {
        req.statusCode = 500;
        log.error(`Error creating user ${res}`);
        req.statusMessage =
          "Erro interno do servidor , por favor tente novamente mais tarde";
        log.groupEnd();
        return next();
      }
      req.statusCode = 200;
      req.statusMessage = "User created successfully";
      log.groupEnd();
      return next();
    } catch (error) {
      req.statusCode = 500;

      log.error(`Error creating user ${error}`);
      req.statusMessage =
        "Erro interno do servidor , por favor tente novamente mais tarde";
      log.groupEnd();
      return next();
    }
  };

  public LoginUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    log.info("Login User Controller");
    try {
      const email = req.body.email;
      const password = req.body.password;

      const missingFields = Filter.filterFields(
        ["email", "password"],
        req.body
      );
      if (missingFields) {
        req.statusCode = 400;
        req.statusMessage = `${
          missingFields.length > 1
            ? "existem campos faltando :"
            : "existe um campo faltando :"
        } 
        ${missingFields.join(", ")}`;
        log.groupEnd();
        return next();
      }

      //check Regex on inputs
      if (!RegexHandler.isEmailValid(email)) {
        req.statusCode = 400;
        req.statusMessage = "Email inválido";
        log.groupEnd();
        return next();
      }
      if (!RegexHandler.isPasswordValid(password)) {
        req.statusCode = 400;
        req.statusMessage = "Senha inválida";
        log.groupEnd();
        return next();
      }
      const user = await this.userModel.readUser(email);
      if (!user) {
        req.statusCode = 404;
        req.statusMessage =
          "verifique suas credenciais, usuário não encontrado";
        log.groupEnd();
        return next();
      }
      const passwordMatch = await Encrypter.comparePasswords(
        password,
        user.password
      );
      if (!passwordMatch) {
        req.statusCode = 401;
        req.statusMessage = "verifique suas credenciais, senha incorreta";
        log.groupEnd();
        return next();
      }
      req.statusCode = 200;
      req.statusMessage = "Logado com sucesso";
      log.groupEnd();
      next();
    } catch (error) {
      req.statusCode = 500;
      log.error(`Error creating user ${error}`);
      req.statusMessage =
        "Erro interno do servidor , por favor tente novamente mais tarde";
      log.groupEnd(l);
      next();
    }
  };
}

export default UserController;
