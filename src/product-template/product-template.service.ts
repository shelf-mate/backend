import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductTemplateService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllProductTemplates() {
    return this.prisma.productTemplate.findMany();
  }

  async getProductTemplateById(id: string) {
    return this.prisma.productTemplate.findUnique({ where: { id } });
  }

  async getProductTemplateByEan(ean: string) {
    return this.prisma.productTemplate.findFirst({ where: { ean } });
  }

  async createProductTemplate(
    data: Omit<Prisma.ProductTemplateCreateInput, 'category' | 'unit'>,
    unitId: string,
    categoryId: string,
  ) {
    return this.prisma.productTemplate.create({
      data: { ...data, categoryId, unitId },
    });
  }

  async updateProductTemplate(
    id: string,
    data: Prisma.ProductTemplateUpdateInput,
  ) {
    return this.prisma.productTemplate.update({ where: { id }, data });
  }

  async deleteProductTemplate(id: string) {
    return this.prisma.productTemplate.delete({ where: { id } });
  }
}
