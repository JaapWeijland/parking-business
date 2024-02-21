import { BuildingsController } from '@buildings/buildings.controller';
import { BuildingsService } from '@buildings/buildings.service';
import { IBuildingsPersistencyService } from '@buildings/interfaces/buildings-persistency-service.interface';
import { IBuildingsService } from '@buildings/interfaces/buildings-service.interface';
import { IFloorsPersistencyService } from '@buildings/interfaces/floors-persistency-service.interface';
import { IParkingSpacesPersistencyService } from '@buildings/interfaces/parking-spaces-persistency-service.interface';
import { BuildingsInMemoryPersistencyService } from '@buildings/persistency/buildings-in-memory-persistency.service';
import { FloorsInMemoryPersistencyService } from '@buildings/persistency/floors-in-memory-persistency.service';
import { ParkingSpacesInMemoryPersistencyService } from '@buildings/persistency/parking-spaces-in-memory-persistency.service';
import { Module } from '@nestjs/common';
import { ParkingSessionsModule } from '@parking-sessions/parking-sessions.module';

@Module({
  imports: [ParkingSessionsModule],
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
