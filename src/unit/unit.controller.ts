import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { UnitService } from './unit.service';
import { Unit } from '@prisma/client';

interface Response<T> {
  message: string;
  data: T;
}

@Controller('units')
export class UnitController {
  constructor(private readonly unitService: UnitService) {}

  // GET all units
  @Get()
  async getAllUnits(): Promise<Response<Unit[]>> {
    const units = await this.unitService.getAllUnits();
    return {
      message: 'Successfully retrieved all units',
      data: units,
    };
  }

  // GET a unit by ID
  @Get(':id')
  async getUnitById(@Param('id') id: string): Promise<Response<Unit | null>> {
    try {
      const unit = await this.unitService.getUnitById(id);
      return {
        message: 'Successfully retrieved unit',
        data: unit,
      };
    } catch {
      return {
        message: 'Unit not found',
        data: null,
      };
    }
  }

  // POST: Create a new unit using Prisma types
  @Post()
  async createUnit(
    @Body() unitData: Omit<Unit, 'id'>,
  ): Promise<Response<Unit>> {
    const unit = await this.unitService.createUnit(unitData);
    return {
      message: 'Unit successfully added',
      data: unit,
    };
  }

  // PATCH: Update a unit by ID
  @Patch(':id')
  async updateUnit(
    @Param('id') id: string,
    @Body() unitData: Omit<Unit, 'id'>,
  ): Promise<Response<Unit>> {
    try {
      const unit = await this.unitService.updateUnit(id, unitData);
      return {
        message: 'Unit successfully updated',
        data: unit,
      };
    } catch {
      return {
        message: 'Unit not found',
        data: undefined,
      };
    }
  }

  // DELETE: Delete a unit by ID
  @Delete(':id')
  async deleteUnit(@Param('id') id: string): Promise<Response<Unit>> {
    const unit = await this.unitService.deleteUnit(id);
    return {
      message: 'Unit successfully deleted',
      data: unit,
    };
  }
}
