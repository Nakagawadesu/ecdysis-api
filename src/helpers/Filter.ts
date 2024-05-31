class Filter {
  static filterFields(fieldList: string[], Obj: Object) {
    const missingFields: string[] = [];

    Object.keys(Obj).forEach((key: string) => {
      if (!fieldList.includes(key)) {
        missingFields.push(key);
      }
    });

    return missingFields.length > 0 ? missingFields : null;
  }
}
export const userFields = ["name", "email", "password"];
export default Filter;
