import { Body, Controller, Post } from '@nestjs/common';
import { CheckInDto } from 'src/parking-sessions/dtos/check-in.dto';
import { ParkingSessionsService } from 'src/parking-sessions/parking-sessions.service';

@Controller('parking-sessions')
export class ParkingSessionsController {
  constructor(private parkingSessionsService: ParkingSessionsService) {}

  @Post('check-in')
  public async checkIn(@Body() checkInDto: CheckInDto) {
    await this.parkingSessionsService.checkIn(checkInDto);
  }
}
