import { CommonError } from 'src/common/common.error';

const ERROR_CODES = [
  'parking-session-not-found',
  'no-parking-space-available',
  'parking-session-already-ended',
] as const;

type ErrorCode = (typeof ERROR_CODES)[number];

export class ParkingSessionsError extends CommonError {
  constructor(code: ErrorCode) {
    super('parking-sessions', code);
  }
}
