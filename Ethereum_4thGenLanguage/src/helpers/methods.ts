export const valuesValidator = (values: any) => {
  return Object.values(values).every((value) => value !== "");
};
