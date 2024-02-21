import { BuildingsModule } from '@buildings/buildings.module';
import { Module, forwardRef } from '@nestjs/common';
import { IParkingSessionsPersistencyService } from '@parking-sessions/interfaces/parking-sessions-persistency-service.interface';
import { IParkingSessionsService } from '@parking-sessions/interfaces/parking-sessions-service.interface';
import { IParkingSessionsStatisticsService } from '@parking-sessions/interfaces/parking-sessions-statistics-service.interface';
import { ParkingSessionsStatisticsService } from '@parking-sessions/parking-sessions-statistics.service';
import { ParkingSessionsController } from '@parking-sessions/parking-sessions.controller';
import { ParkingSessionsService } from '@parking-sessions/parking-sessions.service';
import { ParkingSessionsInMemoryPersistencyService } from '@parking-sessions/persistency/parking-sessions-in-memory-persistency.service';

@Module({
  imports: [forwardRef(() => BuildingsModule)],
  providers: [
    {
      provide: IParkingSessionsStatisticsService,
      useClass: ParkingSessionsStatisticsService,
    },
    {
      provide: IParkingSessionsPersistencyService,
      useClass: ParkingSessionsInMemoryPersistencyService,
    },
    {
      provide: IParkingSessionsService,
      useClass: ParkingSessionsService,
    },
  ],
  exports: [
    {
      provide: IParkingSessionsStatisticsService,
      useClass: ParkingSessionsStatisticsService,
    },
  ],
  controllers: [ParkingSessionsController],
})
export class ParkingSessionsModule {}
