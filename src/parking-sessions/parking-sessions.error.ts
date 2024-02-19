const ERROR_CODES = ['session-not-found'] as const;

type ErrorCode = (typeof ERROR_CODES)[number];

export class ParkingSessionsError extends Error {
  constructor(code: ErrorCode) {
    super(code);
  }
}
