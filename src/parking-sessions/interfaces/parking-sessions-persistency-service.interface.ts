import { ParkingSession } from 'src/parking-sessions/models/parking-session.model';
import { IInMemoryStore } from 'src/persistence/interfaces/in-memory-store.interface';

export interface IParkingSessionsPersistencyService
  extends IInMemoryStore<ParkingSession> {
  getLatestBySpaceId(spaceId: string): Promise<ParkingSession | null>;
}

export const IParkingSessionsPersistencyService = Symbol(
  'IParkingSessionsPersistencyService',
);
