import { Controller, Get } from '@nestjs/common';

@Controller('unit')
export class UnitController {
  @Get()
  getHello(): string {
    return 'Unit!';
  }
}
