import { Module } from '@nestjs/common';
import { IBuildingsPersistencyService } from 'src/buildings/interfaces/buildings-persistency-service.interface';
import { IBuildingsService } from 'src/buildings/interfaces/buildings-service.interface';
import { IFloorsPersistencyService } from 'src/buildings/interfaces/floors-persistency-service.interface';
import { IParkingSpacesPersistencyService } from 'src/buildings/interfaces/parking-spaces-persistency-service.interface';
import { BuildingsInMemoryPersistencyService } from 'src/buildings/persistency/buildings-in-memory-persistency.service';
import { FloorsInMemoryPersistencyService } from 'src/buildings/persistency/floors-in-memory-persistency.service';
import { ParkingSpacesInMemoryPersistencyService } from 'src/buildings/persistency/parking-spaces-in-memory-persistency.service';
import { BuildingsController } from './buildings.controller';
import { BuildingsService } from './buildings.service';

@Module({
  providers: [
    {
      provide: IBuildingsPersistencyService,
      useClass: BuildingsInMemoryPersistencyService,
    },
    {
      provide: IFloorsPersistencyService,
      useClass: FloorsInMemoryPersistencyService,
    },
    {
      provide: IParkingSpacesPersistencyService,
      useClass: ParkingSpacesInMemoryPersistencyService,
    },
    {
      provide: IBuildingsService,
      useClass: BuildingsService,
    },
  ],
  exports: [
    {
      provide: IBuildingsPersistencyService,
      useClass: BuildingsInMemoryPersistencyService,
    },
    {
      provide: IFloorsPersistencyService,
      useClass: FloorsInMemoryPersistencyService,
    },
    {
      provide: IParkingSpacesPersistencyService,
      useClass: ParkingSpacesInMemoryPersistencyService,
    },
  ],
  controllers: [BuildingsController],
})
export class BuildingsModule {}
