import { ParkingSession } from 'src/parking-sessions/models/parking-session.model';

export interface IParkingSessionsPersistencyService {
  saveSession(session: Omit<ParkingSession, 'id'>): Promise<ParkingSession>;
  getSession(id: string): Promise<ParkingSession>;
}
