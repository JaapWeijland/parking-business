import { ParkingSession } from 'src/parking-sessions/models/parking-session.model';
import { VehicleType } from 'src/vehicles/vehicles.constants';

export interface IParkingSessionsService {
  getAll(): Promise<ParkingSession[]>;
  checkIn(args: {
    vehicleType: VehicleType;
    isResident: boolean;
  }): Promise<ParkingSession>;
  checkOut(args: { parkingSessionId: string }): Promise<ParkingSession>;
}

export const IParkingSessionsService = Symbol('IParkingSessionsService');
