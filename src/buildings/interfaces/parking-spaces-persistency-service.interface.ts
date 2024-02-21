import { ParkingSpace } from '@buildings/models/parking-space.model';
import { InMemoryStore } from '@persistence/in-memory-store';

export interface IParkingSpacesPersistencyService
  extends InMemoryStore<ParkingSpace> {}

export const IParkingSpacesPersistencyService = Symbol(
  'IParkingSpacesPersistencyService',
);
