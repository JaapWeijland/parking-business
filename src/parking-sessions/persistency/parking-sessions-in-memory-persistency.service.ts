import { Injectable } from '@nestjs/common';
import { IParkingSessionsPersistencyService } from 'src/parking-sessions/interfaces/parking-sessions-persistency-service.interface';
import { ParkingSession } from 'src/parking-sessions/models/parking-session.model';
import { ParkingSessionsError } from 'src/parking-sessions/parking-sessions.error';
import { v4 } from 'uuid';

@Injectable()
export class ParkingSessionsInMemoryPersistencyService
  implements IParkingSessionsPersistencyService
{
  private sessions: ParkingSession[];

  async saveSession(
    session: Omit<ParkingSession, 'id'>,
  ): Promise<ParkingSession> {
    const _session = { ...session, id: v4() };
    this.sessions.push(_session);
    return _session;
  }

  async getSession(id: string): Promise<ParkingSession> {
    const session = this.sessions.find((session) => session.id === id);

    if (!session) throw new ParkingSessionsError('session-not-found');

    return session;
  }
}
