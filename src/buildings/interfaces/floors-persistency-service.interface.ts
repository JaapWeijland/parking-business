import { Floor } from '@buildings/models/floor.model';
import { InMemoryStore } from '@persistence/in-memory-store';

export interface IFloorsPersistencyService extends InMemoryStore<Floor> {}

export const IFloorsPersistencyService = Symbol('IFloorsPersistencyService');
