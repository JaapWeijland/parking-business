import { Floor } from 'src/buildings/models/floor.model';
import { IInMemoryStore } from 'src/persistence/interfaces/in-memory-store.interface';

export interface IFloorsPersistencyService extends IInMemoryStore<Floor> {}
