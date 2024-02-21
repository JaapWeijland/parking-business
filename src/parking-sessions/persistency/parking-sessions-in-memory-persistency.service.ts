import { Injectable } from '@nestjs/common';
import { IParkingSessionsPersistencyService } from '@parking-sessions/interfaces/parking-sessions-persistency-service.interface';
import { ParkingSession } from '@parking-sessions/models/parking-session.model';
import { InMemoryStore } from '@persistence/in-memory-store';

@Injectable()
export class ParkingSessionsInMemoryPersistencyService
  extends InMemoryStore<ParkingSession>
  implements IParkingSessionsPersistencyService
{
  async getLatestBySpaceId(spaceId: string): Promise<ParkingSession | null> {
    const sessions = this._store
      .filter((session) => session.spaceId === spaceId)
      .sort((s1, s2) => {
        return s2.startTime.valueOf() - s1.startTime.valueOf();
      });

    return sessions[0] ?? null;
  }
}
