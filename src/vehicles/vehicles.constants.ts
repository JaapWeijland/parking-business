export const VEHICLE_TYPES = ['MOTOR', 'CAR'] as const;

export type VehicleType = (typeof VEHICLE_TYPES)[number];
