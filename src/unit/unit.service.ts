import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Unit, Prisma } from '@prisma/client';

@Injectable()
export class UnitService {
  constructor(private prisma: PrismaService) {}

  async unit(unit: Prisma.UnitWhereUniqueInput): Promise<Unit | null> {
    return this.prisma.unit.findUnique({
      where: unit,
    });
  }

  async Units(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UnitWhereUniqueInput;
    where?: Prisma.UnitWhereInput;
    orderBy?: Prisma.UnitOrderByWithRelationInput;
  }): Promise<Unit[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.unit.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createUnit(data: Prisma.UnitCreateInput): Promise<Unit> {
    return this.prisma.unit.create({
      data,
    });
  }

  async updateUnit(params: {
    where: Prisma.UnitWhereUniqueInput;
    data: Prisma.UnitUpdateInput;
  }): Promise<Unit> {
    const { where, data } = params;
    return this.prisma.unit.update({
      data,
      where,
    });
  }

  async deleteUnit(where: Prisma.UnitWhereUniqueInput): Promise<Unit> {
    return this.prisma.unit.delete({
      where,
    });
  }
}
