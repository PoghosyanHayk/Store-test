import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { ProductsRepository } from './repositories/products.repository';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductsRepository)
    private readonly productsRepository: Repository<ProductsRepository>,
  ) {}

  async find(): Promise<Array<ProductsRepository>> {
    try {
      return await this.productsRepository.find({});
    } catch (error) {
      console.log('errorerrorerror', error);
    }
  }
}
