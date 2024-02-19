import { Floor } from 'src/buildings/models/floor.model';

export interface Building {
  id: string;
  floors: Floor[];
}
