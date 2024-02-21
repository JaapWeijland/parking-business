import { BuildingsService } from '@buildings/buildings.service';
import { IBuildingsPersistencyService } from '@buildings/interfaces/buildings-persistency-service.interface';
import { IBuildingsService } from '@buildings/interfaces/buildings-service.interface';
import { IFloorsPersistencyService } from '@buildings/interfaces/floors-persistency-service.interface';
import { IParkingSpacesPersistencyService } from '@buildings/interfaces/parking-spaces-persistency-service.interface';
import { ParkingSpace } from '@buildings/models/parking-space.model';
import { BuildingsInMemoryPersistencyService } from '@buildings/persistency/buildings-in-memory-persistency.service';
import { FloorsInMemoryPersistencyService } from '@buildings/persistency/floors-in-memory-persistency.service';
import { ParkingSpacesInMemoryPersistencyService } from '@buildings/persistency/parking-spaces-in-memory-persistency.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('BuildingsService', () => {
  let service: IBuildingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BuildingsService,
        {
          provide: IBuildingsPersistencyService,
          useClass: BuildingsInMemoryPersistencyService,
        },
        {
          provide: IFloorsPersistencyService,
          useClass: FloorsInMemoryPersistencyService,
        },
        {
          provide: IParkingSpacesPersistencyService,
          useClass: ParkingSpacesInMemoryPersistencyService,
        },
        {
          provide: IBuildingsService,
          useClass: BuildingsService,
        },
      ],
    }).compile();

    service = module.get<IBuildingsService>(IBuildingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('when seeding', () => {
    beforeAll(async () => {
      await service.seed();
    });

    it('should have 1 building', async () => {
      const buildings = await service.getAllBuildings();

      expect(buildings).toHaveLength(1);
    });

    it('should have 150 spaces', async () => {
      const buildings = await service.getAllBuildings();

      const building = buildings[0];

      let spaces: ParkingSpace[] = [];

      building.floors.forEach((floor) => {
        spaces = [...spaces, ...floor.spaces];
      });

      expect(spaces).toHaveLength(150);
    });
  });
});
