import { ParkingSpaceAvailability } from 'src/buildings/buildings.constants';
import { Building } from 'src/buildings/models/building.model';
import { Floor } from 'src/buildings/models/floor.model';
import { ParkingSpace } from 'src/buildings/models/parking-space.model';
import { VehicleType } from 'src/vehicles/vehicles.constants';

export interface IBuildingsService {
  createBuilding(args: { floors: Floor[] }): Promise<Building>;
  createFloor(args: { parkingSpaces: ParkingSpace[] }): Promise<Floor>;
  createParkingSpace(args: {
    availableFor: ParkingSpaceAvailability;
    vehicleTypes: VehicleType[];
  }): Promise<ParkingSpace>;
  seed(): Promise<void>;
  getAllBuildings(): Promise<Building[]>;
}

export const IBuildingsService = Symbol('IBuildingsService');
