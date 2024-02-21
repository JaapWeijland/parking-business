import { IBuildingsPersistencyService } from '@buildings/interfaces/buildings-persistency-service.interface';
import { Building } from '@buildings/models/building.model';
import { Test, TestingModule } from '@nestjs/testing';
import { IParkingSessionsPersistencyService } from '@parking-sessions/interfaces/parking-sessions-persistency-service.interface';
import { IParkingSessionsService } from '@parking-sessions/interfaces/parking-sessions-service.interface';
import { ParkingSessionsService } from '@parking-sessions/parking-sessions.service';
import { ParkingSessionsInMemoryPersistencyService } from '@parking-sessions/persistency/parking-sessions-in-memory-persistency.service';

const mockGetFirst = jest
  .fn()
  .mockReturnValue({ id: 'building-1', floors: [] } satisfies Building);

const mockBuildingsPersistencyService = {
  getFirst: mockGetFirst,
};

describe('ParkingSessionsService', () => {
  let module: TestingModule;
  let service: IParkingSessionsService;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [
        {
          provide: IParkingSessionsService,
          useClass: ParkingSessionsService,
        },
        {
          provide: IParkingSessionsPersistencyService,
          useClass: ParkingSessionsInMemoryPersistencyService,
        },
        {
          provide: IBuildingsPersistencyService,
          useValue: mockBuildingsPersistencyService,
        },
      ],
    }).compile();

    service = module.get<IParkingSessionsService>(IParkingSessionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('when checking in a car', () => {
    describe('when there is a parking space available', () => {
      beforeAll(() => {
        jest.resetAllMocks();
        mockGetFirst.mockReturnValue({
          id: 'building-1',
          floors: [
            {
              id: 'floor-1',
              spaces: [
                {
                  id: 'space-1',
                  availableFor: 'private',
                  vehicleTypes: ['car'],
                },
              ],
            },
          ],
        } satisfies Building);
      });

      it('should succeed', async () => {
        expect(
          service.checkIn({ vehicleType: 'car', isResident: true }),
        ).resolves.not.toThrow();
      });
    });

    describe('when no parking spaces are available', () => {
      beforeAll(() => {
        jest.resetAllMocks();
        mockGetFirst.mockReturnValue({
          id: 'building-2',
          floors: [
            {
              id: 'floor-2',
              spaces: [
                {
                  id: 'space-2',
                  availableFor: 'private',
                  vehicleTypes: ['car'],
                },
              ],
            },
          ],
        } satisfies Building);
      });

      it('should fail', async () => {
        // First consume to only space left
        await service.checkIn({ vehicleType: 'car', isResident: true });

        expect(
          service.checkIn({ vehicleType: 'car', isResident: true }),
        ).rejects.toThrow();
      });
    });
  });
});
