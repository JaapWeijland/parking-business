import { IBuildingsPersistencyService } from '@buildings/interfaces/buildings-persistency-service.interface';
import { Building } from '@buildings/models/building.model';
import { Injectable } from '@nestjs/common';
import { InMemoryStore } from '@persistence/in-memory-store';

@Injectable()
export class BuildingsInMemoryPersistencyService
  extends InMemoryStore<Building>
  implements IBuildingsPersistencyService {}
