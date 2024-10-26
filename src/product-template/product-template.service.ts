import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductTemplateService {
  constructor(private readonly prisma: PrismaService) {}

  async deleteAllProductTemplates() {
    return this.prisma.productTemplate.deleteMany();
  }

  async getAllProductTemplates() {
    return this.prisma.productTemplate.findMany();
  }

  async getProductTemplateById(id: string) {
    return this.prisma.productTemplate.findUnique({ where: { id } });
  }

  async getProductTemplateByEan(
    ean: string,
    include: { category: boolean; unit: boolean } = {
      category: true,
      unit: true,
    },
  ) {
    return this.prisma.productTemplate.findFirst({
      where: { ean },
      include,
    });
  }

  async createProductTemplate(
    data: Omit<Prisma.ProductTemplateCreateInput, 'category' | 'unit'>,
    categoryId?: string,
    unitId?: string,
    include: { category: boolean; unit: boolean } | undefined = {
      category: true,
      unit: true,
    },
  ) {
    return this.prisma.productTemplate.create({
      data: { ...data, categoryId, unitId },
      include: include,
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

  async checkProductTemplateExists(id: string): Promise<boolean> {
    const productTemplate = await this.prisma.productTemplate.findUnique({
      where: { id },
    });
    return !!productTemplate;
  }
}
