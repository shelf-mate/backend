import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Product } from '@prisma/client';

@Injectable()
export class StorageService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllStorages() {
    return this.prisma.storage.findMany();
  }

  async getStorageById(
    id: string,
    include: { products: boolean } = { products: false },
  ) {
    return this.prisma.storage.findUnique({ where: { id }, include });
  }

  async getProductsInStorage(storageId: string): Promise<Product[]> {
    return this.prisma.product.findMany({
      where: { storageId },
      include: {
        category: true,
        unit: true,
        storage: true,
      },
    });
  }

  async createStorage(data: Prisma.StorageCreateInput) {
    return this.prisma.storage.create({ data });
  }

  async updateStorage(id: string, data: Prisma.StorageUpdateInput) {
    return this.prisma.storage.update({ where: { id }, data });
  }

  async deleteStorage(id: string) {
    return this.prisma.storage.delete({ where: { id } });
  }
}
