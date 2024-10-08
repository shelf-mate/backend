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
    try {
      const storage = await this.storageService.getStorageById(id);
      return {
        message: 'Successfully retrieved storage',
        data: storage,
      };
    } catch {
      return {
        message: 'Storage not found',
        data: null,
      };
    }
  }

  @Get(':id/products/')
  async getProductsInStorage(
    @Param('id') id: string,
  ): Promise<Response<Product[]>> {
    try {
      const storage = await this.storageService.getStorageById(id, {
        products: true,
      });
      return {
        message:
          'Successfully retrieved al products in storage ' + storage.name + '.',
        data: storage.products,
      };
    } catch {
      return {
        message: 'Storage not found',
        data: null,
      };
    }
  }

  // POST: Create a new storage using Prisma types
  @Post()
  async createStorage(
    @Body() storageData: Omit<Storage, 'id'>,
  ): Promise<Response<Storage>> {
    const storage = await this.storageService.createStorage(storageData);
    return {
      message: 'Storage successfully added',
      data: storage,
    };
  }

  // PATCH: Update a storage by ID
  @Patch(':id')
  async updateStorage(
    @Param('id') id: string,
    @Body() storageData: Omit<Storage, 'id'>,
  ): Promise<Response<Storage>> {
    try {
      const storage = await this.storageService.updateStorage(id, storageData);
      return {
        message: 'Storage successfully updated',
        data: storage,
      };
    } catch {
      return {
        message: 'Storage not found',
        data: undefined,
      };
    }
  }

  // DELETE: Delete a storage by ID
  @Delete(':id')
  async deleteStorage(@Param('id') id: string): Promise<Response<Storage>> {
    const storage = await this.storageService.deleteStorage(id);
    return {
      message: 'Storage successfully deleted',
      data: storage,
    };
  }
}
