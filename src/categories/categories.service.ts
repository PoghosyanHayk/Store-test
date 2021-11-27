import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Like, Repository } from 'typeorm';
import { CategoriesRepository } from './repositories/categories.repository';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoriesRepository)
    private readonly categoryRepository: Repository<CategoriesRepository>,
  ) {}

  async findById(id: number): Promise<CategoriesRepository> {
    try {
      return await this.categoryRepository.findOne({
        where: [
          {
            id,
          },
        ],
      });
    } catch (error) {
      console.log('errorerrorerror', error);
    }
  }

  async find(slug: string): Promise<Array<CategoriesRepository>> {
    try {
      return await this.categoryRepository.find({
        where: [
          {
            slug: Like(`%${slug || ''}%`),
          },
        ],
      });
    } catch (error) {
      console.log('errorerrorerror', error);
    }
  }
}
