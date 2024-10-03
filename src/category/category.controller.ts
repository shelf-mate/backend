import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from '@prisma/client';

interface Response<T> {
  message: string;
  data: T;
}

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  // GET all categories
  @Get()
  async getAllCategories(): Promise<Response<Category[]>> {
    const categories = await this.categoryService.getAllCategories();
    return {
      message: 'Successfully retrieved all categories',
      data: categories,
    };
  }

  // GET a category by ID
  @Get(':id')
  async getCategoryById(
    @Param('id') id: string,
  ): Promise<Response<Category | null>> {
    try {
      const category = await this.categoryService.getCategoryById(id);
      return {
        message: 'Successfully retrieved category',
        data: category,
      };
    } catch {
      return {
        message: 'Category not found',
        data: null,
      };
    }
  }

  // POST: Create a new category using Prisma types
  @Post()
  async createCategory(
    @Body() categoryData: Omit<Category, 'id'>,
  ): Promise<Response<Category>> {
    const category = await this.categoryService.createCategory(categoryData);
    return {
      message: 'Category successfully added',
      data: category,
    };
  }

  // PATCH: Update a category by ID
  @Patch(':id')
  async updateCategory(
    @Param('id') id: string,
    @Body() categoryData: Omit<Category, 'id'>,
  ): Promise<Response<Category>> {
    try {
      const category = await this.categoryService.updateCategory(
        id,
        categoryData,
      );
      return {
        message: 'Category successfully updated',
        data: category,
      };
    } catch {
      return {
        message: 'Category not found',
        data: undefined,
      };
    }
  }

  // DELETE: Delete a category by ID
  @Delete(':id')
  async deleteCategory(@Param('id') id: string): Promise<Response<Category>> {
    const category = await this.categoryService.deleteCategory(id);
    return {
      message: 'Category successfully deleted',
      data: category,
    };
  }
}
