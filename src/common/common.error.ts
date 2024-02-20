export class CommonError extends Error {
  constructor(namespace: string, code: string) {
    super(`@${namespace}/${code}`);
  }
}
