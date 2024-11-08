import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UnitService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllUnits() {
    return this.prisma.unit.findMany({});
  }

  async getUnitById(id: string) {
    return this.prisma.unit.findUnique({where: { id } });
  }

  async createUnit(data: Prisma.UnitCreateInput) {
    return this.prisma.unit.create({ data });
  }

  async updateUnit(id: string, data: Prisma.UnitUpdateInput) {
    return this.prisma.unit.update({ where: { id }, data });
  }

  async deleteUnit(id: string) {
    return this.prisma.unit.delete({ where: { id } });
  }
}
