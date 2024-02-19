export const VEHICLE_TYPES = ['motor', 'car'] as const;

export type VehicleType = (typeof VEHICLE_TYPES)[number];
