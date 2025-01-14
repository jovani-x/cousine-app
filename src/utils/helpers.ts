const getErrorMessage = (error: unknown): string => {
  return error instanceof Error
    ? error.message
    : typeof error === "string"
    ? error
    : String(error);
};

const isAnySelected = (state: Record<string, boolean>) => {
  return Object.values(state).some((value) => value);
};

const getInitialStateFromEnum = ({
  enumObj,
  initValue,
}: {
  enumObj: Record<string, unknown>;
  initValue: unknown;
}) => Object.fromEntries(Object.keys(enumObj).map((key) => [[key], initValue]));

const fdataToNumber = (value: FormDataEntryValue) => {
  const str = String(value);
  if (!str.length) return undefined;

  const val = Number(str);
  return !isNaN(val) && val > 0 ? val : undefined;
};

const getValuesFromFData = <T extends Record<string, string>>({
  formData,
  enumType,
  extraFn,
}: {
  formData: Record<string, FormDataEntryValue>;
  enumType: T;
  extraFn?: (value: string) => unknown;
}) => {
  const keys = Object.keys(formData).filter((key) => {
    return key in enumType;
  });

  const arr = keys.map((key) => {
    const value = formData[key];
    return { [key]: extraFn ? extraFn(String(value)) : value };
  });

  return Object.assign({}, ...arr);
};

export {
  fdataToNumber,
  getErrorMessage,
  getInitialStateFromEnum,
  getValuesFromFData,
  isAnySelected,
};
