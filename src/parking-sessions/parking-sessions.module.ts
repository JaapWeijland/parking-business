import { Module } from '@nestjs/common';
import { BuildingsModule } from 'src/buildings/buildings.module';
import { IParkingSessionsPersistencyService } from 'src/parking-sessions/interfaces/parking-sessions-persistency-service.interface';
import { IParkingSessionsService } from 'src/parking-sessions/interfaces/parking-sessions-service.interface';
import { ParkingSessionsInMemoryPersistencyService } from 'src/parking-sessions/persistency/parking-sessions-in-memory-persistency.service';
import { ParkingSessionsController } from './parking-sessions.controller';
import { ParkingSessionsService } from './parking-sessions.service';

@Module({
  imports: [BuildingsModule],
  providers: [
    ParkingSessionsService,
    {
      provide: IParkingSessionsPersistencyService,
      useClass: ParkingSessionsInMemoryPersistencyService,
    },
    {
      provide: IParkingSessionsService,
      useClass: ParkingSessionsService,
    },
  ],
  controllers: [ParkingSessionsController],
})
export class ParkingSessionsModule {}
