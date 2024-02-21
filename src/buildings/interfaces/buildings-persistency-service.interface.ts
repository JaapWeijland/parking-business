import { Building } from '@buildings/models/building.model';
import { IInMemoryStore } from '@persistence/interfaces/in-memory-store.interface';

export interface IBuildingsPersistencyService
  extends IInMemoryStore<Building> {}

export const IBuildingsPersistencyService = Symbol(
  'IBuildingsPersistencyService',
);
