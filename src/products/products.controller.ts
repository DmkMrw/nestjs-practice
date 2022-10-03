import { Controller } from '@nestjs/common';
import { CreateProductDTO } from './dto/create-product.dto';
import { ExternalProductDTO } from './dto/external-product.dto';
import { Body, Get, Param, Post, Put, Delete, HttpCode } from '@nestjs/common';
import { ProductsDataService } from './products-data.service';
import { dateToArray } from 'src/shared/helpers/date.helper';
import { Product } from './interfaces/product.interface';
import { UpdateProductDTO } from './dto/update-product.dto';
import { ParseUUIDPipe } from '@nestjs/common/pipes';

@Controller('products')
export class ProductsController {
  constructor(private productRepository: ProductsDataService) {}

  @Get(':id')
  getProductById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) _id_: string,
  ): ExternalProductDTO {
    return this.mapProductToExternal(
      this.productRepository.getProductById(_id_),
    );
  }

  @Get() getAllProducts(): Array<ExternalProductDTO> {
    return this.productRepository
      .getAllProducts()
      .map(this.mapProductToExternal);
  }

  @Post() addProduct(@Body() _item_: CreateProductDTO): ExternalProductDTO {
    return this.productRepository.addProduct(_item_);
  }

  @Put(':id')
  updateProduct(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() dto: UpdateProductDTO,
  ): ExternalProductDTO {
    return this.mapProductToExternal(
      this.productRepository.updateProduct(id, dto),
    );
  }

  @Delete(':id')
  @HttpCode(204)
  deleteProduct(@Param('id') _id_: string): void {
    return this.productRepository.deleteProduct(_id_);
  }

  mapProductToExternal(product: Product): ExternalProductDTO {
    return {
      ...product,
      createdAt: dateToArray(product.createdAt),
      updatedAt: dateToArray(product.updatedAt),
    };
  }
}
