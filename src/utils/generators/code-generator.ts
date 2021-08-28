export const generateOneTimeCode = (accountId: string, length = 6): string => {
  const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let code = '';

  for (let i = 0; i < length; i++) {
    code += characters[Math.floor(Math.random() * characters.length)];
  }

  return accountId.concat('_', code);
};

export const extractOnlyCode = (code: string): string => {
  const onlyCode = code.split('_');

  return onlyCode[1];
};
