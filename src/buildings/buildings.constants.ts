export const PARKING_SPACE_AVAILABILITIES = ['public', 'private'] as const;

export type ParkingSpaceAvailability =
  (typeof PARKING_SPACE_AVAILABILITIES)[number];
