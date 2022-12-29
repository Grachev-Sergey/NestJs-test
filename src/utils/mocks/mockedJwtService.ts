export const mockedJwtService = {
  sign: () => new Promise((resolve) => resolve('generated token')),
};
