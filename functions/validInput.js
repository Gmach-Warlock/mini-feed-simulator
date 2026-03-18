// make sure input only contains possible characters (sanitize)
export const validInput = (text) => {
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*().?" ';
  const isValid = text.split("").every((char) => possible.includes(char));

  return {
    isValid: isValid,
    allowedChars: "Letters, numbers, and !@#$%^&*().? ",
  };
};
