import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllProducts() {
    return this.prisma.product.findMany({
      include: {
        category: true,
        unit: true,
        storage: true,
      },
    });
  }

  async getProductById(id: string) {
    return this.prisma.product.findUnique({
      include: {
        category: true,
        unit: true,
        storage: true,
      },
      where: { id },
    });
  }

  async createProduct(
    data: Omit<Prisma.ProductCreateInput, 'category' | 'storage' | 'unit'>,
    unitId: string,
    categoryId: string,
    storageId: string,
    include: { category: boolean; storage: boolean; unit: boolean } = {
      category: true,
      storage: true,
      unit: true,
    },
  ) {
    return this.prisma.product.create({
      data: {
        ...data,
        category: { connect: { id: categoryId } },
        storage: { connect: { id: storageId } },
        unit: { connect: { id: unitId } },
      },
      include,
    });
  }

  async updateProduct(id: string, data: Prisma.ProductUpdateInput) {
    return this.prisma.product.update({
      include: {
        category: true,
        unit: true,
        storage: true,
      },
      where: { id },
      data,
    });
  }

  async deleteProduct(id: string) {
    return this.prisma.product.delete({
      include: {
        category: true,
        unit: true,
        storage: true,
      },
      where: { id },
    });
  }
}
