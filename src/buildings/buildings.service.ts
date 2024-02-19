import { Injectable } from '@nestjs/common';
import { ParkingSpaceAvailability } from 'src/buildings/buildings.constants';
import { IBuildingsPersistencyService } from 'src/buildings/interfaces/buildings-persistency-service.interface';
import { IBuildingsService } from 'src/buildings/interfaces/buildings-service.interface';
import { IFloorsPersistencyService } from 'src/buildings/interfaces/floors-persistency-service.interface';
import { IParkingSpacesPersistencyService } from 'src/buildings/interfaces/parking-spaces-persistency-service.interface';
import { Building } from 'src/buildings/models/building.model';
import { Floor } from 'src/buildings/models/floor.model';
import { ParkingSpace } from 'src/buildings/models/parking-space.model';
import { VehicleType } from 'src/vehicles/vehicles.constants';

@Injectable()
export class BuildingsService implements IBuildingsService {
  constructor(
    private buildingsPersistencyService: IBuildingsPersistencyService,
    private floorsPersistencyService: IFloorsPersistencyService,
    private parkingSpacesPersistencyService: IParkingSpacesPersistencyService,
  ) {}

  async createBuilding(args: { floors: Floor[] }): Promise<Building> {
    return this.buildingsPersistencyService.save({ floors: args.floors });
  }

  async createFloor(args: { parkingSpaces: ParkingSpace[] }): Promise<Floor> {
    return this.floorsPersistencyService.save({ spaces: args.parkingSpaces });
  }

  async createParkingSpace(args: {
    availableFor: ParkingSpaceAvailability;
    vehicleTypes: VehicleType[];
  }): Promise<ParkingSpace> {
    return this.parkingSpacesPersistencyService.save({
      availableFor: args.availableFor,
      vehicleTypes: args.vehicleTypes,
    });
  }

  async seed() {
    const residentSpaces = await Promise.all(
      new Array(50).fill(null).map(() => {
        return this.createParkingSpace({
          availableFor: 'private',
          vehicleTypes: ['car', 'motor'],
        });
      }),
    );

    const publicCarSpaces = await Promise.all(
      new Array(80).fill(null).map(() => {
        return this.createParkingSpace({
          availableFor: 'public',
          vehicleTypes: ['car'],
        });
      }),
    );

    const publicMotorSpaces = await Promise.all(
      new Array(80).fill(null).map(() => {
        return this.createParkingSpace({
          availableFor: 'public',
          vehicleTypes: ['motor'],
        });
      }),
    );

    const floor1Spaces = [...residentSpaces, ...publicCarSpaces.splice(0, 25)];
    const floor2Spaces = [...publicCarSpaces, ...publicMotorSpaces];

    const [floor1, floor2] = await Promise.all([
      this.createFloor({ parkingSpaces: floor1Spaces }),
      this.createFloor({ parkingSpaces: floor2Spaces }),
    ]);

    await this.createBuilding({ floors: [floor1, floor2] });
  }
}
