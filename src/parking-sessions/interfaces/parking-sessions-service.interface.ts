import { ParkingSession } from 'src/parking-sessions/models/parking-session.model';
import { VehicleType } from 'src/vehicles/vehicles.constants';

export interface IParkingSessionsService {
  checkIn(args: {
    vehicleType: VehicleType;
    isResident: boolean;
  }): Promise<ParkingSession>;
}
