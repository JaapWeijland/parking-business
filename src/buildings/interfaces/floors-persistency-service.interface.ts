import { Floor } from 'src/buildings/models/floor.model';
import { InMemoryStore } from 'src/persistence/in-memory-store';

export interface IFloorsPersistencyService extends InMemoryStore<Floor> {}

export const IFloorsPersistencyService = Symbol('IFloorsPersistencyService');
