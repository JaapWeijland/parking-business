import { Rate } from 'src/financials/models/rate.model';

export interface Plan {
  id: string;
  rate: Rate;
}
