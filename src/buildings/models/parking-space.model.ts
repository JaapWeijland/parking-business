import { ParkingSpaceAvailability } from 'src/buildings/buildings.constants';
import { VehicleType } from 'src/vehicles/vehicles.constants';

export interface ParkingSpace {
  id: string;
  availableFor: ParkingSpaceAvailability;
  vehicleTypes: VehicleType[];
}
