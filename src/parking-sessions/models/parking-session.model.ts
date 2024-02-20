export interface ParkingSession {
  id: string;
  startTime: Date;
  endTime?: Date;
  spaceId: string;
}
