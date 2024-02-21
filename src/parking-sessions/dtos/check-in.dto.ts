import { ApiProperty } from '@nestjs/swagger';
import { VEHICLE_TYPES, VehicleType } from '@vehicles/vehicles.constants';
import { IsBoolean, IsIn, IsNotEmpty } from 'class-validator';

export class CheckInDto {
  @ApiProperty({ enum: VEHICLE_TYPES })
  @IsNotEmpty()
  @IsIn(VEHICLE_TYPES)
  vehicleType: VehicleType;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  isResident: boolean;
}
