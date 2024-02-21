import { Floor } from '@buildings/models/floor.model';

export interface Building {
  id: string;
  floors: Floor[];
}
