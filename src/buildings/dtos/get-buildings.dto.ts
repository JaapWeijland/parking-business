import { Building } from '@buildings/models/building.model';
import { Floor } from '@buildings/models/floor.model';
import { ApiProperty } from '@nestjs/swagger';

export class GetBuildingsDTO implements Building {
  @ApiProperty()
  id: string;

  @ApiProperty({ type: Floor, isArray: true })
  floors: Floor[];
}
