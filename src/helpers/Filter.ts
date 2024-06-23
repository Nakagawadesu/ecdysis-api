import HttpStatusCode from "../utils/HttpStatusCode";
import Logger from "./Logger";
const log = new Logger();
class Filter {
  static getMissingFields(fieldList: string[], Obj: Object) {
    const missingFields: string[] = [];

    fieldList.forEach((key: string) => {
      if (!Object.keys(Obj).includes(key)) {
        missingFields.push(key);
      }
    });

    return missingFields.length > 0 ? missingFields : null;
  }
  static validateFields = (fields: string[], data: Record<string, any>) => {
    // Check if data is provided
    log.info(`validatingFields`);
    if (!data) {
      return {
        status: HttpStatusCode.BAD_REQUEST,
        message: `Dados não fornecidos`,
      };
    }

    const missingFields = this.getMissingFields(fields, data);
    // Return null if everything is fine
    if (!missingFields) return null;

    const missingFieldsStr = missingFields.join(", ");

    if (missingFields.length > 0) {
      return {
        status: HttpStatusCode.BAD_REQUEST,
        message: `${
          missingFields.length > 1
            ? "existem campos faltando :"
            : "existe um campo faltando :"
        } 
              ${missingFields.join(", ")}`,
        log: `Missing fields : ${missingFieldsStr}`,
      };
    }
  };

  static trimEmail = (data: string) => {
    const trimmedEmail = data.toLowerCase().trim();
    console.log(`trimmedEmail: ${trimmedEmail}`);
    return trimmedEmail;
  };
}
export const userFields = ["name", "email", "password", "confirmPassword"];
export default Filter;
