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
import { ProductTemplate } from '@prisma/client';
import axios from 'axios';
import { CategoryService } from 'src/category/category.service';
import * as moment from 'moment';

interface Response<T> {
  message: string;
  data: T;
}

@Controller('productTemplates')
export class ProductTemplateController {
  constructor(
    private readonly productTemplateService: ProductTemplateService,
    private readonly categoryService: CategoryService,
  ) {}

  @Get('nuke')
  async nuke(): Promise<Response<string>> {
    await this.productTemplateService.deleteAllProductTemplates();
    return {
      message: 'Nuked all productTemplates',
      data: 'Nuked all productTemplates',
    };
  }

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

  // GET a productTemplate by EAN, will create the productTemplate if it doesn't exist and incidate that it might be new
  @Get('/by-ean/:ean')
  async getProductTemplateByEan(
    @Param('ean') ean: string,
  ): Promise<Response<ProductTemplate | null> & { new: boolean }> {
    try {
      const productTemplate =
        await this.productTemplateService.getProductTemplateByEan(ean);
      if (!productTemplate) {
        try {
          const { data } = await axios.get(
            'https://world.openfoodfacts.org/api/v2/product/' + ean,
            {
              headers: {
                'User-Agent': 'ShelfMate - Web - V0 - github.com/shelf-mate',
              },
            },
          );
          const prod = data.product;
          const states = prod.states;
          const categoryName = states.includes('en:categories-to-be-completed')
            ? undefined
            : prod.categories.split(',')[0];
          let categoryId = (
            await this.categoryService.findCategoryByName(categoryName)
          )?.id;
          if (!categoryId && categoryName) {
            categoryId = (
              await this.categoryService.createCategory({ name: categoryName })
            ).id;
          }
          const expirationDate = states.includes(
            'en:expiration-date-to-be-completed',
          )
            ? undefined
            : moment(prod.expiration_date);
          const addedDate = moment(prod.entry_dates_tags[0]);
          const expiration_time = expirationDate
            ? expirationDate.diff(addedDate, 'days')
            : undefined;
          const name =
            prod.product_name ?? prod.product_name_en ?? prod.product_name_fr;
          const res = await this.productTemplateService.createProductTemplate(
            {
              name,
              ean: data.product.code,
              expiration_time,
            },
            categoryId,
            undefined,
            { category: true, unit: false },
          );
          return {
            message: 'Created new productTemplate based on openfoodfacts data',
            data: res,
            new: true,
          };
        } catch (e) {
          if (e.response.status === 404) {
            const res = await this.productTemplateService.createProductTemplate(
              {
                ean,
              },
            );
            return {
              message:
                'Product not found on openfoodfacts created new empty productTemplate',
              data: res,
              new: true,
            };
          }
        }
        new Error('Error retrieving product from openfoodfacts');
      }
      return {
        message: 'Successfully retrieved productTemplate',
        data: productTemplate,
        new: false,
      };
    } catch (e) {
      console.error(e);
      return {
        message: 'Error retrieving productTemplate',
        data: undefined,
        new: false,
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
    @Body() productTemplateData: Partial<Omit<ProductTemplate, 'id'>>,
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
