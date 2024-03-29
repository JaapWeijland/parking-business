import { ParkingSpaceAvailability } from '@buildings/buildings.constants';
import { IBuildingsPersistencyService } from '@buildings/interfaces/buildings-persistency-service.interface';
import { IBuildingsService } from '@buildings/interfaces/buildings-service.interface';
import { IFloorsPersistencyService } from '@buildings/interfaces/floors-persistency-service.interface';
import { IParkingSpacesPersistencyService } from '@buildings/interfaces/parking-spaces-persistency-service.interface';
import { Building } from '@buildings/models/building.model';
import { Floor } from '@buildings/models/floor.model';
import { ParkingSpace } from '@buildings/models/parking-space.model';
import { Inject, Injectable } from '@nestjs/common';
import { VehicleType } from '@vehicles/vehicles.constants';

@Injectable()
export class BuildingsService implements IBuildingsService {
  constructor(
    @Inject(IBuildingsPersistencyService)
    private buildingsPersistencyService: IBuildingsPersistencyService,
    @Inject(IFloorsPersistencyService)
    private floorsPersistencyService: IFloorsPersistencyService,
    @Inject(IParkingSpacesPersistencyService)
    private parkingSpacesPersistencyService: IParkingSpacesPersistencyService,
  ) {}

  async getAllBuildings(): Promise<Building[]> {
    return this.buildingsPersistencyService.getAll();
  }

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
    console.log('Seeding...');
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
      new Array(20).fill(null).map(() => {
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
    console.log('Seeding done.');
  }
}
