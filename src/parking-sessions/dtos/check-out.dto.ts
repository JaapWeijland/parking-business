import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CheckOutDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  parkingSessionId: string;
}
