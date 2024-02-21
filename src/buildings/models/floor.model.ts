import { ParkingSpace } from '@buildings/models/parking-space.model';
import { ApiProperty } from '@nestjs/swagger';

export class Floor {
  @ApiProperty()
  id: string;

  @ApiProperty({ type: ParkingSpace, isArray: true })
  spaces: ParkingSpace[];
}
