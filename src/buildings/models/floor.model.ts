import { Space } from 'src/buildings/models/space.model';

export interface Floor {
  id: string;
  spaces: Space[];
}
