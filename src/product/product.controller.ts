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
import { ProductService } from './product.service';
import { Product } from '@prisma/client';

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
    const products = await this.productService.getAllProducts();
    return {
      message: 'Successfully retrieved all products',
      data: products,
    };
  }

  // GET a product by ID
  @Get(':id')
  async getProductById(
    @Param('id') id: string,
  ): Promise<Response<Product | null>> {
    if (!(await this.productService.checkProductExists(id))) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    const product = await this.productService.getProductById(id);
    return {
      message: `Successfully retrieved product ${product.name}`,
      data: product,
    };
  }

  // POST: Create a new product using Prisma types
  @Post()
  async createProduct(
    @Body() productData: Omit<Product, 'id'>,
  ): Promise<Response<Product>> {
    const { categoryId, unitId, storageId, ...rest } = productData;
    try {
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
    } catch {
      throw new BadRequestException('Error creating product');
    }
  }

  // PATCH: Update a product by ID
  @Patch(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() productData: Omit<Product, 'id'>,
  ): Promise<Response<Product>> {
    if (!(await this.productService.checkProductExists(id))) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    const product = await this.productService.updateProduct(id, productData);
    return {
      message: `Product ${product.name} successfully updated`,
      data: product,
    };
  }

  // DELETE: Delete a product by ID
  @Delete(':id')
  async deleteProduct(@Param('id') id: string): Promise<Response<Product>> {
    if (!(await this.productService.checkProductExists(id))) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    const product = await this.productService.deleteProduct(id);
    return {
      message: `Product ${product.name} successfully deleted`,
      data: product,
    };
  }
}
