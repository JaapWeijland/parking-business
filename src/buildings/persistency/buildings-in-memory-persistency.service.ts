import { Injectable } from '@nestjs/common';
import { IBuildingsPersistencyService } from 'src/buildings/interfaces/buildings-persistency-service.interface';
import { Building } from 'src/buildings/models/building.model';
import { InMemoryStore } from 'src/persistence/in-memory-store';

@Injectable()
export class BuildingsInMemoryPersistencyService
  extends InMemoryStore<Building>
  implements IBuildingsPersistencyService {}
