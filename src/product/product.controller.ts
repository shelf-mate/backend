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
import { Product } from 'shelfmate-typings-package';

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
    try {
      const product = await this.productService.getProductById(id);
      return {
        message: 'Successfully retrieved product',
        data: product,
      };
    } catch {
      return {
        message: 'Product not found',
        data: null,
      };
    }
  }

  // POST: Create a new product using Prisma types
  @Post()
  async createProduct(
    @Body() productData: Omit<Product, 'id'>,
  ): Promise<Response<Product>> {
    const { categoryId, unitId, storageId, ...rest } = productData;
    const product = await this.productService.createProduct(
      rest,
      unitId,
      categoryId,
      storageId,
    );
    return {
      message: 'Product successfully added',
      data: product,
    };
  }

  // PATCH: Update a product by ID
  @Patch(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() productData: Omit<Product, 'id'>,
  ): Promise<Response<Product>> {
    try {
      const product = await this.productService.updateProduct(id, productData);
      return {
        message: 'Product successfully updated',
        data: product,
      };
    } catch {
      return {
        message: 'Product not found',
        data: undefined,
      };
    }
  }

  // DELETE: Delete a product by ID
  @Delete(':id')
  async deleteProduct(@Param('id') id: string): Promise<Response<Product>> {
    const product = await this.productService.deleteProduct(id);
    return {
      message: 'Product successfully deleted',
      data: product,
    };
  }
}
