import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UnitService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllUnits() {
    return this.prisma.unit.findMany();
  }

  async getUnitById(id: string) {
    return this.prisma.unit.findUnique({ where: { id } });
  }

  async createUnit(data: Prisma.UnitCreateInput) {
    try {
      const unit = await this.prisma.unit.create({ data });
      return { message: 'Unit added', data: { id: unit.id } };
    } catch (error) {
      return { message: 'Error adding unit', error: error.message };
    }
  }

  async updateUnit(id: string, data: Prisma.UnitUpdateInput) {
    try {
      const unit = await this.prisma.unit.update({ where: { id }, data });
      return { message: 'Unit updated', data: { id: unit.id } };
    } catch (error) {
      return { message: 'Error updating unit', error: error.message };
    }
  }

  async deleteUnit(id: string) {
    try {
      await this.prisma.unit.delete({ where: { id } });
      return { message: 'Unit deleted', data: { id } };
    } catch (error) {
      return { message: 'Error deleting unit', error: error.message };
    }
  }
}
