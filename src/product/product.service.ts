import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllProducts(include: {category: boolean, unit: boolean, storage: boolean} = {
    category: true,
    storage: true,
    unit: true
  }) {
    return this.prisma.product.findMany({ include });
  }

  async getProductById(id: string, include: {category: boolean, unit: boolean, storage: boolean} = {
    category: true,
    storage: true,
    unit: true
  }) {
    return this.prisma.product.findUnique({ include, where: { id }});
  }

  async getProductByUnit(unit: string, include: {category: boolean, unit: boolean, storage: boolean} = {
    category: true,
    storage: true,
    unit: true
  }) {
    // @ts-ignore
    return this.prisma.product.findUnique({ include, where: { unit }});
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

  async updateProduct(id: string, data: Prisma.ProductUpdateInput, include: {category: boolean, unit: boolean, storage: boolean} = {
    category: true,
    storage: true,
    unit: true
  }) {
    return this.prisma.product.update({ include, where: { id }, data});
  }

  async deleteProduct(id: string, include: {category: boolean, unit: boolean, storage: boolean} = {
    category: true,
    storage: true,
    unit: true
  }) {
    return this.prisma.product.delete({ include, where: { id }});
  }
}
