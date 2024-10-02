import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class StorageService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllStorages() {
    return this.prisma.storage.findMany();
  }

  async getStorageById(id: string) {
    return this.prisma.storage.findUnique({ where: { id } });
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
