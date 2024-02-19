import { Injectable } from '@nestjs/common';
import { IFloorsPersistencyService } from 'src/buildings/interfaces/floors-persistency-service.interface';
import { Floor } from 'src/buildings/models/floor.model';
import { InMemoryStore } from 'src/persistence/in-memory-store';

@Injectable()
export class FloorsInMemoryPersistencyService
  extends InMemoryStore<Floor>
  implements IFloorsPersistencyService {}
