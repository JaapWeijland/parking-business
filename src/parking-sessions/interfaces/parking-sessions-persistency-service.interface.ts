import { ParkingSession } from 'src/parking-sessions/models/parking-session.model';

export interface IParkingSessionsPersistencyService {
  save(session: Omit<ParkingSession, 'id'>): Promise<ParkingSession>;
  get(id: string): Promise<ParkingSession>;
}
