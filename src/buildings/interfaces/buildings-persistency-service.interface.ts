import { Building } from 'src/buildings/models/building.model';

export interface IBuildingsPersistencyService {
  get(id: string): Promise<Building>;

  save(building: Omit<Building, 'id'>): Promise<Building>;
}
