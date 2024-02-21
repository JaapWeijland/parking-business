export interface IParkingSessionsStatisticsService {
  getAvailableSpacesOverview(): Promise<{
    availableParkingSpaces: {
      car: number;
      motor: number;
      public: number;
      private: number;
      total: number;
    };
  }>;
}

export const IParkingSessionsStatisticsService = Symbol(
  'IParkingSessionsStatisticsService',
);
