import { SpaceAvailability } from 'src/buildings/buildings.constants';
import { VehicleType } from 'src/vehicles/vehicles.constants';

export interface Space {
  id: string;
  availableFor: SpaceAvailability;
  vehicleType: VehicleType;
}
