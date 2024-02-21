import { ParkingSession } from '@parking-sessions/models/parking-session.model';
import { VehicleType } from '@vehicles/vehicles.constants';

export interface IParkingSessionsService {
  getAll(): Promise<ParkingSession[]>;
  checkIn(args: {
    vehicleType: VehicleType;
    isResident: boolean;
  }): Promise<ParkingSession>;
  checkOut(args: { parkingSessionId: string }): Promise<ParkingSession>;
  isParkingSpaceAvailable(parkingSpaceId: string): Promise<boolean>;
}

export const IParkingSessionsService = Symbol('IParkingSessionsService');
