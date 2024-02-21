import { GetBuildingsDTO } from '@buildings/dtos/get-buildings.dto';
import { IBuildingsService } from '@buildings/interfaces/buildings-service.interface';
import { Controller, Get, Inject, Post } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { IParkingSessionsStatisticsService } from '@parking-sessions/interfaces/parking-sessions-statistics-service.interface';

@Controller('buildings')
export class BuildingsController {
  constructor(
    @Inject(IBuildingsService) private buildingsService: IBuildingsService,
    @Inject(IParkingSessionsStatisticsService)
    private parkingSessionsStatisticsService: IParkingSessionsStatisticsService,
  ) {}

  @Get()
  @ApiOkResponse({
    type: GetBuildingsDTO,
    isArray: true,
  })
  async getBuildings() {
    return this.buildingsService.getAllBuildings();
  }

  @Get('/statistics')
  async getAvailableParkingSpaces() {
    return this.parkingSessionsStatisticsService.getAvailableSpacesOverview();
  }

  @Post('seed')
  async seed() {
    await this.buildingsService.seed();
  }
}
