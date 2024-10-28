import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from '@prisma/client';
import { handlePrismaError } from "../utilities.service";

interface Response<T> {
  message: string;
  data: T;
}

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // GET all products
  @Get()
  async getAllProducts(): Promise<Response<Product[]>> {
    try{
      const products = await this.productService.getAllProducts();
      return {
        message: 'Successfully retrieved all products',
        data: products,
      };
    } catch (error) {
      handlePrismaError(error);
    }

  }

  // GET a product by ID
  @Get(':id')
  async getProductById(
    @Param('id') id: string,
  ): Promise<Response<Product | null>> {
    try{
      const product = await this.productService.getProductById(id);
      return {
        message: `Successfully retrieved product ${product.name}`,
        data: product,
      };
    } catch (error) {
      handlePrismaError(error);
    }
  }

  // POST: Create a new product using Prisma types
  @Post()
  async createProduct(
    @Body() productData: Omit<Product, 'id'>,
  ): Promise<Response<Product>> {
    try{
      const { categoryId, unitId, storageId, ...rest } = productData;
      const product = await this.productService.createProduct(
        rest,
        unitId,
        categoryId,
        storageId,
      );
      return {
        message: `Product ${product.name} successfully added`,
        data: product,
      };
    } catch (error) {
      handlePrismaError(error);
    }
  }

  // PATCH: Update a product by ID
  @Patch(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() productData: Omit<Product, 'id'>,
  ): Promise<Response<Product>> {
    try{
      const product = await this.productService.updateProduct(id, productData);
      return {
        message: `Product ${product.name} successfully updated`,
        data: product,
      };
    } catch (error) {
      handlePrismaError(error);
    }
  }

  // DELETE: Delete a product by ID
  @Delete(':id')
  async deleteProduct(@Param('id') id: string): Promise<Response<Product>> {
    try{
      const product = await this.productService.deleteProduct(id);
      return {
        message: `Product ${product.name} successfully deleted`,
        data: product,
      };
    } catch (error) {
      handlePrismaError(error);
    }
  }
}
