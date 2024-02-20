import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { IBuildingsService } from 'src/buildings/interfaces/buildings-service.interface';
import { AppModule } from './app.module';

const PORT = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT);
  console.log(`App listening on port: ${PORT}`);
  const buildingService = app.get<IBuildingsService>(IBuildingsService);
  await buildingService.seed();
}
bootstrap();
