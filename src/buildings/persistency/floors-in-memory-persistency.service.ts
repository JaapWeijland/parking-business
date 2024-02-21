import { IFloorsPersistencyService } from '@buildings/interfaces/floors-persistency-service.interface';
import { Floor } from '@buildings/models/floor.model';
import { Injectable } from '@nestjs/common';
import { InMemoryStore } from '@persistence/in-memory-store';

@Injectable()
export class FloorsInMemoryPersistencyService
  extends InMemoryStore<Floor>
  implements IFloorsPersistencyService {}
