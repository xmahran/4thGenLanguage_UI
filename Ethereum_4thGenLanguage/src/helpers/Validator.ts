export const validate = (
  args: any[],
  reqLength: number[],
  contains?: any[] //RegExp (regular expression)
): boolean => {
  let validated = true;

  args.forEach((record, index) => {
    if (record) {
      if (record.length <= reqLength[index]) {
        validated = false;
        return;
      }
    }
    if (contains) {
      if (contains[index]) {
        if (!contains[index].test(record)) {
          validated = false;
          return;
        }
      }
    }
  });

  return validated;
};
