import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { StorageService } from './storage.service';
import { Product, Storage } from '@prisma/client';
import { ProductService } from 'src/product/product.service';
import { handlePrismaError } from "../utilities.service";

interface Response<T> {
  message: string;
  data: T;
}

@Controller('storages')
export class StorageController {
  constructor(
    private readonly storageService: StorageService,
    private readonly productsService: ProductService,
  ) {}

  // GET all storages
  @Get()
  async getAllStorages(): Promise<Response<Storage[]>> {
    const storages = await this.storageService.getAllStorages();
    return {
      message: 'Successfully retrieved all storages',
      data: storages,
    };
  }

  // GET a storage by ID
  @Get(':id')
  async getStorageById(
    @Param('id') id: string,
  ): Promise<Response<Storage | null>> {
    try{
      const storage = await this.storageService.getStorageById(id);
      return {
        message: `Successfully retrieved storage ${storage.name}`,
        data: storage,
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
      const storage = await this.storageService.getStorageById(id, {
        products: true,
      });
      return {
        message: `Successfully retrieved all products in storage ${storage.name}.`,
        data: storage.products,
      };
    } catch (error) {
      handlePrismaError(error);
    }
  }
  // POST: Create a new storage using Prisma types
  @Post()
  async createStorage(
    @Body() storageData: Omit<Storage, 'id'>,
  ): Promise<Response<Storage>> {
    try{
      const storage = await this.storageService.createStorage(storageData);
      return {
        message: `Storage ${storage.name} successfully added`,
        data: storage,
      };
    } catch (error) {
      handlePrismaError(error);
    }
  }

  // PATCH: Update a storage by ID
  @Patch(':id')
  async updateStorage(
    @Param('id') id: string,
    @Body() storageData: Omit<Storage, 'id'>,
  ): Promise<Response<Storage>> {
    try{
      const storage = await this.storageService.updateStorage(id, storageData);
      return {
        message: `Storage ${storage.name} successfully updated`,
        data: storage,
      };
    } catch (error) {
      handlePrismaError(error);
    }
  }

  // DELETE: Delete a storage by ID
  @Delete(':id')
  async deleteStorage(@Param('id') id: string): Promise<Response<Storage>> {
    try{
      const storage = await this.storageService.deleteStorage(id);
      return {
        message: `Storage ${storage.name} successfully deleted`,
        data: storage,
      };
    } catch (error) {
      handlePrismaError(error);
    }
  }
}
