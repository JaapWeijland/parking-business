import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BuildingsModule } from './buildings/buildings.module';
import { FinancialsModule } from './financials/financials.module';
import { PersistenceModule } from './persistence/persistence.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { ParkingSessionsModule } from './parking-sessions/parking-sessions.module';

@Module({
  imports: [BuildingsModule, FinancialsModule, PersistenceModule, VehiclesModule, ParkingSessionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
