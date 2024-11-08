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
import { Category, Product } from '@prisma/client';
import { handlePrismaError} from "../utilities.service";

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
    try{
      const categories = await this.categoryService.getAllCategories();
      return {
        message: 'Successfully retrieved all categories',
        data: categories,
      };
    } catch (error) {
      handlePrismaError(error);
    }
  }

  // GET a category by ID
  @Get(':id')
  async getCategoryById(
    @Param('id') id: string,
  ): Promise<Response<Category | null>> {
    try{
      const category = await this.categoryService.getCategoryById(id);
      return {
        message: `Successfully retrieved category ${category.name}`,
        data: category,
      };
    } catch (error) {
      handlePrismaError(error);
    }
  }

  @Get(':id/products/')
  async getProductsInStorage(
    @Param('id') id: string,
  ): Promise<Response<Product[]>> {
    try{
      const category = await this.categoryService.getCategoryById(id, {
        products: true,
      });
      return {
        message: `Successfully retrieved al products in category ${category.name}`,
        data: category.products,
      };
    } catch (error) {
      handlePrismaError(error);
    }
  }

  // POST: Create a new category using Prisma types
  @Post()
  async createCategory(
    @Body() categoryData: Omit<Category, 'id'>,
  ): Promise<Response<Category>> {
    try{
      const category = await this.categoryService.createCategory(categoryData);
      return {
        message: `Category ${category.name} successfully added`,
        data: category,
      };
    } catch (error) {
      handlePrismaError(error);
    }
  }

  // PATCH: Update a category by ID
  @Patch(':id')
  async updateCategory(
    @Param('id') id: string,
    @Body() categoryData: Omit<Category, 'id'>,
  ): Promise<Response<Category>> {
    try{
      const category = await this.categoryService.updateCategory(
        id,
        categoryData,
      );
      return {
        message: `Category ${category.name} successfully updated`,
        data: category,
      };
    } catch (error) {
      handlePrismaError(error);
    }
  }

  // DELETE: Delete a category by ID
  @Delete(':id')
  async deleteCategory(@Param('id') id: string): Promise<Response<Category>> {
    try{
      const category = await this.categoryService.deleteCategory(id);
      return {
        message: `Category ${category.name} successfully deleted`,
        data: category,
      };
    } catch (error) {
      handlePrismaError(error);
    }

  }
}
