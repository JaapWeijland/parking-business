import { Building } from 'src/buildings/models/building.model';
import { IInMemoryStore } from 'src/persistence/interfaces/in-memory-store.interface';

export interface IBuildingsPersistencyService
  extends IInMemoryStore<Building> {}

export const IBuildingsPersistencyService = Symbol(
  'IBuildingsPersistencyService',
);
