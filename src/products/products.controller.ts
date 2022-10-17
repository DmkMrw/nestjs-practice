import { Controller } from '@nestjs/common';
import { CreateProductDTO } from './dto/create-product.dto';
import { ExternalProductDTO } from './dto/external-product.dto';
import {
  Body,
  Get,
  Param,
  Post,
  Put,
  Delete,
  UseGuards,
  HttpCode,
  Query,
} from '@nestjs/common';
import { ProductsDataService } from './products-data.service';
import { dateToArray } from 'src/shared/helpers/date.helper';
import { UpdateProductDTO } from './dto/update-product.dto';
import { ParseUUIDPipe } from '@nestjs/common/pipes';
import { RoleGuard } from 'src/shared/guards/role.guard';
import { Product } from './db/products.entity';
import { Tags } from './enums/tags.enum';
import { ProductsQuery } from './queries/ProductsQuery.interface';

@Controller('products')
export class ProductsController {
  productService: any;
  constructor(private productRepository: ProductsDataService) {}

  @Get(':id')
  async getProductById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) _id_: string,
  ): Promise<ExternalProductDTO> {
    const product = await this.productRepository.getProductById(_id_);
    return this.mapProductToExternal(product);
  }

  @Get()
  async getAllProducts(
    @Query() query: ProductsQuery,
  ): Promise<Array<ExternalProductDTO>> {
    return (await this.productRepository.getAllProducts(query)).map((product) =>
      this.mapProductToExternal(product),
    );
  }

  @UseGuards(RoleGuard)
  @Post()
  async addProduct(
    @Body() item: CreateProductDTO,
  ): Promise<ExternalProductDTO> {
    return this.mapProductToExternal(
      await this.productService.addProduct(item),
    );
  }

  @Put(':id')
  async updateProduct(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() dto: UpdateProductDTO,
  ): Promise<ExternalProductDTO> {
    return this.mapProductToExternal(
      await this.productRepository.updateProduct(id, dto),
    );
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteProduct(@Param('id') id: string): Promise<void> {
    return await this.productRepository.deleteProduct(id);
  }

  mapProductToExternal(product: Product): ExternalProductDTO {
    return {
      ...product,
      createdAt: dateToArray(product.createdAt),
      updatedAt: dateToArray(product.updatedAt),
      tags: product.tags?.map((i) => i.name) as Tags[],
    };
  }
}
