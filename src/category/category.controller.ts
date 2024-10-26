import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category, Product } from '@prisma/client';

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
    if (!(await this.categoryService.checkCategoryExists(id))) {
      throw new NotFoundException(`Unit with ID ${id} not found`);
    } else if (!id) {
      throw new BadRequestException(`Invalid category ID`);
    }
    const category = await this.categoryService.getCategoryById(id);
    return {
      message: `Successfully retrieved category ${category.name}`,
      data: category,
    };
  }

  @Get(':id/products/')
  async getProductsInStorage(
    @Param('id') id: string,
  ): Promise<Response<Product[]>> {
    const category = await this.categoryService.getCategoryById(id, {
      products: true,
    });
    if (!(await this.categoryService.checkCategoryExists(id))) {
      throw new NotFoundException(`Category with ${id} not found`);
    }
    return {
      message: `Successfully retrieved al products in category ${category.name}`,
      data: category.products,
    };
  }

  // POST: Create a new category using Prisma types
  @Post()
  async createCategory(
    @Body() categoryData: Omit<Category, 'id'>,
  ): Promise<Response<Category>> {
    const category = await this.categoryService.createCategory(categoryData);
    return {
      message: `Category ${category.name} successfully added`,
      data: category,
    };
  }

  // PATCH: Update a category by ID
  @Patch(':id')
  async updateCategory(
    @Param('id') id: string,
    @Body() categoryData: Omit<Category, 'id'>,
  ): Promise<Response<Category>> {
    if (!(await this.categoryService.checkCategoryExists(id))) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    const category = await this.categoryService.updateCategory(
      id,
      categoryData,
    );
    return {
      message: `Category ${category.name} successfully updated`,
      data: category,
    };
  }

  // DELETE: Delete a category by ID
  @Delete(':id')
  async deleteCategory(@Param('id') id: string): Promise<Response<Category>> {
    if (!(await this.categoryService.checkCategoryExists(id))) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    const category = await this.categoryService.deleteCategory(id);
    return {
      message: `Category ${category.name} successfully deleted`,
      data: category,
    };
  }
}
