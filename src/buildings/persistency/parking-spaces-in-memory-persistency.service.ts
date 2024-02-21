import { IParkingSpacesPersistencyService } from '@buildings/interfaces/parking-spaces-persistency-service.interface';
import { ParkingSpace } from '@buildings/models/parking-space.model';
import { Injectable } from '@nestjs/common';
import { InMemoryStore } from '@persistence/in-memory-store';

@Injectable()
export class ParkingSpacesInMemoryPersistencyService
  extends InMemoryStore<ParkingSpace>
  implements IParkingSpacesPersistencyService {}
