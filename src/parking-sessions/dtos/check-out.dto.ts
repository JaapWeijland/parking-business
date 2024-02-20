import { IsNotEmpty, IsString } from 'class-validator';

export class CheckOutDto {
  @IsNotEmpty()
  @IsString()
  parkingSessionId: string;
}
