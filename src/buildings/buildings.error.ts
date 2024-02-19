const ERROR_CODES = ['building-not-found'] as const;

type ErrorCode = (typeof ERROR_CODES)[number];

export class BuildingsError extends Error {
  constructor(code: ErrorCode) {
    super(code);
  }
}
