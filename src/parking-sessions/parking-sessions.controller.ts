import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { CheckInResponseDto } from '@parking-sessions/dtos/check-in-response.dto';
import { CheckInDto } from '@parking-sessions/dtos/check-in.dto';
import { CheckOutDto } from '@parking-sessions/dtos/check-out.dto';
import { GetParkingSessionsResponseDto } from '@parking-sessions/dtos/get-parking-sessions-response.dto';
import { IParkingSessionsService } from '@parking-sessions/interfaces/parking-sessions-service.interface';

@Controller('parking-sessions')
export class ParkingSessionsController {
  constructor(
    @Inject(IParkingSessionsService)
    private parkingSessionsService: IParkingSessionsService,
  ) {}

  @ApiOkResponse({
    description: 'The user records',
    type: GetParkingSessionsResponseDto,
    isArray: true,
  })
  @Get()
  public async getAll() {
    const sessions = await this.parkingSessionsService.getAll();

    return sessions;
  }

  @Post('check-in')
  @ApiOkResponse({
    description: 'The user records',
    type: CheckInResponseDto,
  })
  public async checkIn(
    @Body() checkInDto: CheckInDto,
  ): Promise<CheckInResponseDto> {
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
