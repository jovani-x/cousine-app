export const getErrorMessage = (error: unknown): string => {
  return error instanceof Error
    ? error.message
    : typeof error === "string"
    ? error
    : String(error);
};
