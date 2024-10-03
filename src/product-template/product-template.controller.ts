import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ProductTemplateService } from './product-template.service';
import { ProductTemplate } from 'shelfmate-typings-package';

interface Response<T> {
  message: string;
  data: T;
}

@Controller('productTemplates')
export class ProductTemplateController {
  constructor(
    private readonly productTemplateService: ProductTemplateService,
  ) {}

  // GET all productTemplates
  @Get()
  async getAllProductTemplates(): Promise<Response<ProductTemplate[]>> {
    const productTemplates =
      await this.productTemplateService.getAllProductTemplates();
    return {
      message: 'Successfully retrieved all productTemplates',
      data: productTemplates,
    };
  }

  // GET a productTemplate by ID
  @Get(':id')
  async getProductTemplateById(
    @Param('id') id: string,
  ): Promise<Response<ProductTemplate | null>> {
    try {
      const productTemplate =
        await this.productTemplateService.getProductTemplateById(id);
      return {
        message: 'Successfully retrieved productTemplate',
        data: productTemplate,
      };
    } catch {
      return {
        message: 'ProductTemplate not found',
        data: null,
      };
    }
  }

  // GET a productTemplate by ID
  @Get('/by-ean/:ean')
  async getProductTemplateByEan(
    @Param('ean') ean: string,
  ): Promise<Response<ProductTemplate | null> & { new: boolean }> {
    try {
      const productTemplate =
        await this.productTemplateService.getProductTemplateByEan(ean);
      return {
        message: 'Successfully retrieved productTemplate',
        data: productTemplate,
        new: false,
      };
    } catch {
      return {
        message: 'ProductTemplate not found',
        data: null,
        new: true,
      };
    }
  }

  // POST: Create a new productTemplate using Prisma types
  @Post()
  async createProductTemplate(
    @Body() productTemplateData: Omit<ProductTemplate, 'id'>,
  ): Promise<Response<ProductTemplate>> {
    const { categoryId, unitId, ...rest } = productTemplateData;
    const productTemplate =
      await this.productTemplateService.createProductTemplate(
        rest,
        unitId,
        categoryId,
      );
    return {
      message: 'ProductTemplate successfully added',
      data: productTemplate,
    };
  }

  // PATCH: Update a productTemplate by ID
  @Patch(':id')
  async updateProductTemplate(
    @Param('id') id: string,
    @Body() productTemplateData: Omit<ProductTemplate, 'id'>,
  ): Promise<Response<ProductTemplate>> {
    try {
      const productTemplate =
        await this.productTemplateService.updateProductTemplate(
          id,
          productTemplateData,
        );
      return {
        message: 'ProductTemplate successfully updated',
        data: productTemplate,
      };
    } catch {
      return {
        message: 'ProductTemplate not found',
        data: undefined,
      };
    }
  }

  // DELETE: Delete a productTemplate by ID
  @Delete(':id')
  async deleteProductTemplate(
    @Param('id') id: string,
  ): Promise<Response<ProductTemplate>> {
    const productTemplate =
      await this.productTemplateService.deleteProductTemplate(id);
    return {
      message: 'ProductTemplate successfully deleted',
      data: productTemplate,
    };
  }
}
