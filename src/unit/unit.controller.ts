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
import { handlePrismaError } from "../utilities.service";

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
    try{
      const units = await this.unitService.getAllUnits();
      return {
        message: 'Successfully retrieved all units',
        data: units,
      };
    } catch (error) {
      handlePrismaError(error);
    }
  }

  // GET a unit by ID
  @Get(':id')
  async getUnitById(@Param('id') id: string): Promise<Response<Unit | null>> {
    try{
      const unit = await this.unitService.getUnitById(id);
      return {
        message: `Successfully retrieved unit ${unit.name}`,
        data: unit,
      };
    } catch (error) {
      handlePrismaError(error);
    }
  }

  // POST: Create a new unit using Prisma types
  @Post()
  async createUnit(
    @Body() unitData: Omit<Unit, 'id'>,
  ): Promise<Response<Unit>> {
    try{
      const unit = await this.unitService.createUnit(unitData);
      return {
        message: `Unit ${unit.name} successfully added`,
        data: unit,
      };
    } catch (error) {
      handlePrismaError(error);
    }
  }

  // PATCH: Update a unit by ID
  @Patch(':id')
  async updateUnit(
    @Param('id') id: string,
    @Body() unitData: Omit<Unit, 'id'>,
  ): Promise<Response<Unit>> {
    try{
      const unit = await this.unitService.updateUnit(id, unitData);
      return {
        message: `Unit ${unit.name} successfully updated`,
        data: unit,
      };
    } catch (error) {
      handlePrismaError(error);
    }
  }

  // DELETE: Delete a unit by ID
  @Delete(':id')
  async deleteUnit(@Param('id') id: string): Promise<Response<Unit>> {
    try{
      const unit = await this.unitService.deleteUnit(id);
      return {
        message: `Unit ${unit.name} successfully deleted`,
        data: unit,
      };
    } catch (error) {
      handlePrismaError(error);
    }
  }
}
