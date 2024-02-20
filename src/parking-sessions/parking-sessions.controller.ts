import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { CheckInDto } from 'src/parking-sessions/dtos/check-in.dto';
import { CheckOutDto } from 'src/parking-sessions/dtos/check-out.dto';
import { IParkingSessionsService } from 'src/parking-sessions/interfaces/parking-sessions-service.interface';

@Controller('parking-sessions')
export class ParkingSessionsController {
  constructor(
    @Inject(IParkingSessionsService)
    private parkingSessionsService: IParkingSessionsService,
  ) {}

  @Get()
  public async getAll() {
    const sessions = await this.parkingSessionsService.getAll();

    return sessions;
  }

  @Post('check-in')
  public async checkIn(@Body() checkInDto: CheckInDto) {
    const session = await this.parkingSessionsService.checkIn({
      vehicleType: checkInDto.vehicleType,
      isResident: checkInDto.isResident,
    });

    return session;
  }

  @Post('check-out')
  public async checkOut(@Body() checkOutDto: CheckOutDto) {
    const session = await this.parkingSessionsService.checkOut({
      parkingSessionId: checkOutDto.parkingSessionId,
    });

    return session;
  }
}
