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
import { Prisma } from '@prisma/client';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('units')
@Controller('units')
export class UnitController {
  constructor(private readonly unitService: UnitService) {}

  // GET all units
  @Get()
  @ApiOperation({ summary: 'Get all units' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all units.',
  })
  async getAllUnits() {
    return this.unitService.getAllUnits();
  }

  // GET a unit by ID
  @Get(':id')
  @ApiOperation({ summary: 'Get a unit by ID' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved unit.' })
  async getUnitById(@Param('id') id: string) {
    return this.unitService.getUnitById(id);
  }

  // POST: Create a new unit using Prisma types
  @Post()
  @ApiOperation({ summary: 'Add a new unit' })
  @ApiResponse({ status: 201, description: 'Unit successfully added.' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'New Unit Name',
          description: 'The name of the unit',
        },
      },
    },
  })
  async createUnit(@Body() unitData: Prisma.UnitCreateInput) {
    return this.unitService.createUnit(unitData);
  }

  // PATCH: Update a unit by ID
  @Patch(':id')
  @ApiOperation({ summary: 'Edit a unit by ID' })
  @ApiResponse({ status: 200, description: 'Unit successfully updated.' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'Updated Unit Name',
          description: 'The updated name of the unit',
        },
      },
    },
  })
  async updateUnit(
    @Param('id') id: string,
    @Body() unitData: Prisma.UnitUpdateInput,
  ) {
    return this.unitService.updateUnit(id, unitData);
  }

  // DELETE: Delete a unit by ID
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a unit by ID' })
  @ApiResponse({ status: 200, description: 'Unit successfully deleted.' })
  async deleteUnit(@Param('id') id: string) {
    return this.unitService.deleteUnit(id);
  }
}
