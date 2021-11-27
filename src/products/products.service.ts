import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Like, Repository } from 'typeorm';
import { ProductsRepository } from './repositories/products.repository';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductsRepository)
    private readonly productsRepository: Repository<ProductsRepository>,
  ) {}

  async findById(id: number): Promise<ProductsRepository> {
    try {
      return await this.productsRepository.findOne({
        where: [
          {
            id,
          },
        ],
      });
    } catch (error) {
      console.log('error', error);
    }
  }

  async find(slug: string): Promise<Array<ProductsRepository>> {
    try {
      return await this.productsRepository.find({
        where: [
          {
            slug: Like(`%${slug || ''}%`),
          },
        ],
        relations: ['category'],
      });
    } catch (error) {
      console.log('error', error);
    }
  }
}
