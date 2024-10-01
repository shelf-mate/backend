import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UnitService } from './unit/unit.service';
import { UnitController } from './unit/unit.controller';

@Module({
  imports: [],
  controllers: [AppController, UnitController],
  providers: [AppService, PrismaService, UnitService],
})
export class AppModule {}
