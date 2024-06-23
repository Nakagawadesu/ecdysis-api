import { Request, Response, NextFunction } from "express";
import Logger from "../../helpers/Logger";
import Filter, { userFields } from "../../helpers/Filter";
import RegexHandler from "../../helpers/RegexHandler";
import { UserType } from "../../types/UserType";
import UserModel from "../../models/User/UserModel";
import requestAssembler from "../../services/RequestAssembler";
import HttpStatusCode from "../../utils/HttpStatusCode";

import * as handlebars from "handlebars";
import sendEmail from "../../helpers/nodeMailer";
import SecretEncrypter from "../../helpers/SecretEncrypter";
import moment from "moment";
import verificationEmail from "../../templates/VerificationEmail";
import { VerificationSuccessTemplate } from "../../templates/VerificationSuccessTemplate";
import dotenv from "dotenv";
import { MongoServerError } from "mongodb";
dotenv.config();

const log = new Logger();

class RegistryController {
  private userModelInstace: UserModel;
  private secretEncrypter = new SecretEncrypter();
  public constructor(userModelInstace: UserModel) {
    this.userModelInstace = userModelInstace;
  }

  public RegisterUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    log.info("Create User Controller");

    const email = Filter.trimEmail(req.body.email);
    const password = req.body.password;
    const username = req.body.username;

    const missingFields = Filter.validateFields(userFields, req.body);

    //check Regex on inputs
    if (!RegexHandler.isEmailValid(email)) {
      req.statusMessage = "Email inválido";

      const payload = {
        status: HttpStatusCode.BAD_REQUEST,
        message: "Email inválido",
        log: `Invalid email : ${email}`,
      };
      return requestAssembler.assembleRequest(req, next, payload);
    }
    if (!RegexHandler.isPasswordValid(password)) {
      const payload = {
        status: HttpStatusCode.BAD_REQUEST,
        message: "Senha inválido",
        log: `Invalid password : ${password}`,
      };
      return requestAssembler.assembleRequest(req, next, payload);
    }
    if (password !== req.body.confirmPassword) {
      const payload = {
        status: HttpStatusCode.BAD_REQUEST,
        message: "Senhas não conferem",
        log: `Password and confirm password do not match`,
      };
      return requestAssembler.assembleRequest(req, next, payload);
    }
    const user: UserType = {
      accountData: {
        username: username,
        email: email,
        password: password,
        emailVerified: false,
      },
    };
    try {
      const res = await this.userModelInstace.createUser(user);

      if (!res) {
        const payload = {
          status: HttpStatusCode.INTERNAL_SERVER_ERROR,
          message:
            "Erro interno do servidor , por favor tente novamente mais tarde",
          log: `Error creating user ${res}`,
        };
        return requestAssembler.assembleRequest(req, next, payload);
      }

      const email = Filter.trimEmail(req.body.email);
      const tokenCreatedAt = new Date().toISOString();
      const token = `${email} ${tokenCreatedAt}`;
      const encriptedtoken = this.secretEncrypter.encryptData(token);

      log.warning(`Token hash: ${encriptedtoken}`);

      const data = moment(tokenCreatedAt).format("DD/MM/YYYY");

      const horario = moment(tokenCreatedAt).format("HH:mm:ss");
      const template = handlebars.compile(verificationEmail);
      const send = await sendEmail({
        to: email,
        subject: "Seu código de verificação",
        body: template({
          clientUrl:
            `${process.env.CLIENT_URL}/auth/confirm/email` ||
            "http://localhost:3000/auth/confirm/email",
          token: encriptedtoken,
          data: data,
          horario: horario,
        }),
      });
      const payload = {
        status: HttpStatusCode.OK,
        message:
          "Usuário criado com sucesso, Cheque seu email para ativar sua conta",
        log: `User Created ${res}`,
      };
      return requestAssembler.assembleRequest(req, next, payload);
    } catch (error) {
      req.statusCode = 500;

      log.error(`Error creating user ${error}`);
      req.statusMessage =
        "Erro interno do servidor , por favor tente novamente mais tarde";
      log.groupEnd();
      const payload = {
        status: HttpStatusCode.INTERNAL_SERVER_ERROR,
        message:
          "Erro interno do servidor , por favor tente novamente mais tarde",
        log: `An error occurred while creating user ${error}`,
      };

      return requestAssembler.assembleRequest(req, next, payload);
    }
  };

  public sendVerificationEmail = async (
    req: Request,

    res: Response,
    next: NextFunction
  ) => {
    const email = Filter.trimEmail(req.body.email);
    const tokenCreatedAt = new Date().toISOString();
    const token = `${email} ${tokenCreatedAt}`;
    const encriptedtoken = this.secretEncrypter.encryptData(token);

    log.warning(`Token hash: ${encriptedtoken}`);

    const data = moment(tokenCreatedAt).format("DD/MM/YYYY");

    const horario = moment(tokenCreatedAt).format("HH:mm:ss");
    const template = handlebars.compile(verificationEmail);
    const send = await sendEmail({
      to: email,
      subject: "Seu código de verificação",
      body: template({
        clientUrl:
          `${process.env.CLIENT_URL}/auth/confirm/email` ||
          "http://localhost:3000/auth/confirm/email",
        token: encriptedtoken,
        data: data,
        horario: horario,
      }),
    });
  };
  public confirmEmail = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const token = req.params.token;

    const decryptedToken = this.secretEncrypter.decryptData(token);
    const email = decryptedToken.split(" ")[0];
    const tokenCreatedAt = decryptedToken.split(" ")[1];

    if (moment(tokenCreatedAt).isBefore(moment().subtract(1, "days"))) {
      requestAssembler.assembleRequest(req, next, {
        status: HttpStatusCode.BAD_REQUEST,
        message: "Token expirado",
        log: `Token expired`,
      });
    }

    const user = await this.userModelInstace.readUser(email);
    if (!user) {
      return requestAssembler.assembleRequest(req, next, {
        status: HttpStatusCode.NOT_FOUND,
        message: "Usuário não encontrado",
        log: `User not found`,
      });
    }
    const userId = user._id;

    const response = await this.userModelInstace.verifyEmail(
      JSON.stringify(userId)
    );
    if (!response) {
      return requestAssembler.assembleRequest(req, next, {
        status: HttpStatusCode.INTERNAL_SERVER_ERROR,
        message: "Erro interno do servidor",
        log: `Error verifying email`,
      });
    }
    const template = handlebars.compile(VerificationSuccessTemplate);

    return requestAssembler.assembleRequest(req, next, {
      status: HttpStatusCode.OK,
      message: "Email verificado com sucesso",
      body: template,
      log: `Email verified`,
    });
  };
}
export default RegistryController;
