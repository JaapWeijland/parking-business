import { Injectable } from '@nestjs/common';
import { IParkingSessionsPersistencyService } from 'src/parking-sessions/interfaces/parking-sessions-persistency-service.interface';
import { ParkingSession } from 'src/parking-sessions/models/parking-session.model';
import { InMemoryStore } from 'src/persistence/in-memory-store';

@Injectable()
export class ParkingSessionsInMemoryPersistencyService
  extends InMemoryStore<ParkingSession>
  implements IParkingSessionsPersistencyService {}
