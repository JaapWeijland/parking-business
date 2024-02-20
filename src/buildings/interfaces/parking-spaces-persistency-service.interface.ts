import { ParkingSpace } from 'src/buildings/models/parking-space.model';
import { InMemoryStore } from 'src/persistence/in-memory-store';

export interface IParkingSpacesPersistencyService
  extends InMemoryStore<ParkingSpace> {}

export const IParkingSpacesPersistencyService = Symbol(
  'IParkingSpacesPersistencyService',
);
