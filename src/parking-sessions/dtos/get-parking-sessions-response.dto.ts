import { ApiProperty } from '@nestjs/swagger';
import { ParkingSession } from '@parking-sessions/models/parking-session.model';

export class GetParkingSessionsResponseDto implements ParkingSession {
  @ApiProperty({ example: '1234-abcd-56678' })
  id: string;

  @ApiProperty()
  startTime: Date;

  @ApiProperty({ type: Date, nullable: true })
  endTime?: Date | undefined;

  @ApiProperty({ example: '1234-abcd-56678' })
  spaceId: string;
}
