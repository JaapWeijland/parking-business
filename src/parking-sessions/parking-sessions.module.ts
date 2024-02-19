import { Module } from '@nestjs/common';
import { ParkingSessionsInMemoryPersistencyService } from 'src/parking-sessions/parking-sessions-in-memory-persistency.service';
import { ParkingSessionsController } from './parking-sessions.controller';
import { ParkingSessionsService } from './parking-sessions.service';

@Module({
  providers: [
    ParkingSessionsService,
    {
      provide: 'IParkingSessionsPersistencyService',
      useClass: ParkingSessionsInMemoryPersistencyService,
    },
    {
      provide: 'IParkingSessionsService',
      useClass: ParkingSessionsService,
    },
  ],
  controllers: [ParkingSessionsController],
})
export class ParkingSessionsModule {}
