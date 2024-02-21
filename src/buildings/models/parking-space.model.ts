import {
  PARKING_SPACE_AVAILABILITIES,
  ParkingSpaceAvailability,
} from '@buildings/buildings.constants';
import { ApiProperty } from '@nestjs/swagger';
import { VEHICLE_TYPES, VehicleType } from '@vehicles/vehicles.constants';

export class ParkingSpace {
  @ApiProperty()
  id: string;

  @ApiProperty({ enum: PARKING_SPACE_AVAILABILITIES })
  availableFor: ParkingSpaceAvailability;

  @ApiProperty({ enum: VEHICLE_TYPES, isArray: true })
  vehicleTypes: VehicleType[];
}
