import { ParkingSpace } from 'src/buildings/models/parking-space.model';

export interface Floor {
  id: string;
  spaces: ParkingSpace[];
}
