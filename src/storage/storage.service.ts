import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

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

  async createStorage(data: Prisma.StorageCreateInput) {
    return this.prisma.storage.create({ data });
  }

  async updateStorage(id: string, data: Prisma.StorageUpdateInput) {
    return this.prisma.storage.update({ where: { id }, data });
  }

  async deleteStorage(id: string) {
    return this.prisma.storage.delete({ where: { id } });
  }

  async checkStorageExists(id: string): Promise<boolean> {
    const storage = await this.prisma.storage.findUnique({
      where: { id },
    });
    return !!storage;
  }
}
