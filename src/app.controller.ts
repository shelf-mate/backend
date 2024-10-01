import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { UnitService } from './unit/unit.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly unitService: UnitService,
  ) {}

  @Get()
  getHello(): string {
    this.unitService.createUnit({
      name: 'test',
    });
    return this.appService.getHello();
  }
}
