import { ParkingSession } from '@parking-sessions/models/parking-session.model';
import { IInMemoryStore } from '@persistence/interfaces/in-memory-store.interface';

export interface IParkingSessionsPersistencyService
  extends IInMemoryStore<ParkingSession> {
  getLatestBySpaceId(spaceId: string): Promise<ParkingSession | null>;
}

export const IParkingSessionsPersistencyService = Symbol(
  'IParkingSessionsPersistencyService',
);
