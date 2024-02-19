import { Injectable } from '@nestjs/common';
import { IParkingSessionsPersistencyService } from 'src/parking-sessions/interfaces/parking-sessions-persistency-service.interface';
import { IParkingSessionsService } from 'src/parking-sessions/interfaces/parking-sessions-service.interface';
import { ParkingSession } from 'src/parking-sessions/models/parking-session.model';
import { VehicleType } from 'src/vehicles/vehicles.constants';

@Injectable()
export class ParkingSessionsService implements IParkingSessionsService {
  constructor(private persistencyService: IParkingSessionsPersistencyService) {}

  async checkIn(args: {
    vehicleType: VehicleType;
    isResident: boolean;
  }): Promise<ParkingSession> {
    return this.persistencyService.saveSession({});
  }
}
