import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllCategories() {
    return this.prisma.category.findMany();
  }

  async getCategoryById(id: string) {
    return this.prisma.category.findUnique({ where: { id } });
  }

  async createCategory(data: Prisma.CategoryCreateInput) {
    return this.prisma.category.create({ data });
  }

  async updateCategory(id: string, data: Prisma.CategoryUpdateInput) {
    return this.prisma.category.update({ where: { id }, data });
  }

  async deleteCategory(id: string) {
    return this.prisma.category.delete({ where: { id } });
  }
}
