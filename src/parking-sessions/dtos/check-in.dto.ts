import { IsBoolean, IsIn, IsNotEmpty } from 'class-validator';
import { VEHICLE_TYPES, VehicleType } from 'src/vehicles/vehicles.constants';

export class CheckInDto {
  @IsNotEmpty()
  @IsIn(VEHICLE_TYPES)
  vehicleType: VehicleType;

  @IsNotEmpty()
  @IsBoolean()
  isResident: boolean;
}
