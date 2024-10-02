import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UnitService } from './unit/unit.service';
import { UnitController } from './unit/unit.controller';
import { ProductController } from './product/product.controller';
import { StorageController } from './storage/storage.controller';
import { CategoryController } from './category/category.controller';
import { ProductTemplateController } from './product-template/product-template.controller';
import { ProductService } from './product/product.service';
import { StorageService } from './storage/storage.service';
import { CategoryService } from './category/category.service';
import { ProductTemplateService } from './product-template/product-template.service';
@Module({
  controllers: [
    AppController,
    UnitController,
    ProductController,
    StorageController,
    CategoryController,
    ProductTemplateController,
  ],
  providers: [
    AppService,
    PrismaService,
    UnitService,
    ProductService,
    StorageService,
    CategoryService,
    ProductTemplateService,
  ],
})
export class AppModule {}
