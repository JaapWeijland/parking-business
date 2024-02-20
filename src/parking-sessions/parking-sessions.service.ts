import { Inject, Injectable } from '@nestjs/common';
import { IBuildingsPersistencyService } from 'src/buildings/interfaces/buildings-persistency-service.interface';
import { ParkingSpace } from 'src/buildings/models/parking-space.model';
import { IParkingSessionsPersistencyService } from 'src/parking-sessions/interfaces/parking-sessions-persistency-service.interface';
import { IParkingSessionsService } from 'src/parking-sessions/interfaces/parking-sessions-service.interface';
import { ParkingSession } from 'src/parking-sessions/models/parking-session.model';
import { ParkingSessionsError } from 'src/parking-sessions/parking-sessions.error';
import { VehicleType } from 'src/vehicles/vehicles.constants';

@Injectable()
export class ParkingSessionsService implements IParkingSessionsService {
  constructor(
    @Inject(IParkingSessionsPersistencyService)
    private parkingSessionPersistencyService: IParkingSessionsPersistencyService,
    @Inject(IBuildingsPersistencyService)
    private buildingPersistencyService: IBuildingsPersistencyService,
  ) {}

  getAll(): Promise<ParkingSession[]> {
    return this.parkingSessionPersistencyService.getAll();
  }

  async checkIn(args: {
    vehicleType: VehicleType;
    isResident: boolean;
  }): Promise<ParkingSession> {
    const availableSpace = await this.getAvailableParkingSpace({
      vehicleType: args.vehicleType,
      isResident: args.isResident,
    });

    if (!availableSpace)
      throw new ParkingSessionsError('no-parking-space-available');

    return this.parkingSessionPersistencyService.save({
      startTime: new Date(),
      spaceId: availableSpace?.id,
    });
  }

  async checkOut(args: { parkingSessionId: string }): Promise<ParkingSession> {
    let session = await this.parkingSessionPersistencyService.get(
      args.parkingSessionId,
    );

    if (session.endTime)
      throw new ParkingSessionsError('parking-session-already-ended');

    session = await this.parkingSessionPersistencyService.update({
      id: args.parkingSessionId,
      endTime: new Date(),
    });

    return session;
  }

  private async getAvailableParkingSpace(args: {
    vehicleType: VehicleType;
    isResident: boolean;
  }) {
    const building = await this.buildingPersistencyService.getFirst();

    let availableSpace: ParkingSpace | null = null;

    for (const floor of building.floors) {
      for (const space of floor.spaces) {
        if (space.availableFor !== (args.isResident ? 'private' : 'public'))
          continue;
        if (!space.vehicleTypes.includes(args.vehicleType)) continue;

        const isAvailable = await this.isParkingSpaceAvailable(space.id);

        if (isAvailable) {
          availableSpace = space;
          break;
        }
      }
    }

    return availableSpace;
  }

  private async isParkingSpaceAvailable(
    parkingSpaceId: string,
  ): Promise<boolean> {
    const latestSession =
      await this.parkingSessionPersistencyService.getLatestBySpaceId(
        parkingSpaceId,
      );

    if (latestSession === null) return true;

    return !!latestSession.endTime;
  }
}
