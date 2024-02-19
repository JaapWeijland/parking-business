import { Injectable } from '@nestjs/common';
import { IParkingSpacesPersistencyService } from 'src/buildings/interfaces/parking-spaces-persistency-service.interface';
import { ParkingSpace } from 'src/buildings/models/parking-space.model';
import { InMemoryStore } from 'src/persistence/in-memory-store';

@Injectable()
export class ParkingSpacesInMemoryPersistencyService
  extends InMemoryStore<ParkingSpace>
  implements IParkingSpacesPersistencyService {}
