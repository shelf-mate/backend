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
import { Storage } from '@prisma/client';

interface Response<T> {
  message: string;
  data: T;
}

@Controller('storages')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

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
