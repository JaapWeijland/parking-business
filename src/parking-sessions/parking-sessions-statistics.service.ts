import { IBuildingsPersistencyService } from '@buildings/interfaces/buildings-persistency-service.interface';
import { ParkingSpace } from '@buildings/models/parking-space.model';
import { Inject, Injectable } from '@nestjs/common';
import { IParkingSessionsService } from '@parking-sessions/interfaces/parking-sessions-service.interface';
import { IParkingSessionsStatisticsService } from '@parking-sessions/interfaces/parking-sessions-statistics-service.interface';

@Injectable()
export class ParkingSessionsStatisticsService
  implements IParkingSessionsStatisticsService
{
  constructor(
    @Inject(IBuildingsPersistencyService)
    private buildingPersistencyService: IBuildingsPersistencyService,
    @Inject(IParkingSessionsService)
    private parkingSessionsService: IParkingSessionsService,
  ) {}

  async getAvailableSpacesOverview(): Promise<{
    availableParkingSpaces: {
      car: number;
      motor: number;
      public: number;
      private: number;
      total: number;
    };
  }> {
    const building = await this.buildingPersistencyService.getFirst();

    const availableCar: ParkingSpace[] = [];
    const availableMotor: ParkingSpace[] = [];
    const availablePublic: ParkingSpace[] = [];
    const availablePrivate: ParkingSpace[] = [];
    const availableTotal: ParkingSpace[] = [];

    for (const floor of building.floors) {
      for (const space of floor.spaces) {
        const isAvailable =
          await this.parkingSessionsService.isParkingSpaceAvailable(space.id);

        if (!isAvailable) continue;

        availableTotal.push(space);

        if (space.vehicleTypes.includes('motor')) availableMotor.push(space);
        if (space.vehicleTypes.includes('car')) availableCar.push(space);
        if (space.availableFor === 'private') availablePrivate.push(space);
        if (space.availableFor === 'public') availablePublic.push(space);
      }
    }

    return {
      availableParkingSpaces: {
        car: availableCar.length,
        motor: availableMotor.length,
        public: availablePublic.length,
        private: availablePrivate.length,
        total: availableTotal.length,
      },
    };
  }
}
