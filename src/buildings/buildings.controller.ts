import { Controller, Get, Inject, Post } from '@nestjs/common';
import { IBuildingsService } from 'src/buildings/interfaces/buildings-service.interface';

@Controller('buildings')
export class BuildingsController {
  constructor(
    @Inject(IBuildingsService) private buildingsService: IBuildingsService,
  ) {}

  @Get()
  async getBuildings() {
    return this.buildingsService.getAllBuildings();
  }

  @Post('seed')
  async seed() {
    await this.buildingsService.seed();
  }
}
