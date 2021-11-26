import { CreateProductsCommand } from '../impl/create-products.command';
import { ICommandHandler, CommandHandler, EventBus } from '@nestjs/cqrs';
import { getCustomRepository } from 'typeorm';
import { ProductsRepository } from 'src/products/repositories/products.repository';
import { Products } from 'src/products/products.entity';
import { CategoriesRepository } from 'src/categories/repositories/categories.repository';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(CreateProductsCommand)
export class CreateProductsHandler
  implements ICommandHandler<CreateProductsCommand> {
  constructor(private readonly eventBus: EventBus) {}

  async execute(command: CreateProductsCommand) {
    const { category_id, name, slug, price } = command;
    const productsRepository = getCustomRepository(ProductsRepository);
    const categoriesRepository = getCustomRepository(CategoriesRepository);

    const cat = await categoriesRepository.findOne({ id: category_id });

    if (!cat) {
      throw new NotFoundException(`Category #${category_id} not found`);
    }
    const product = productsRepository.create();
    product.category = cat;
    product.name = name;
    product.slug = slug;
    product.price = price;
    const userDB: Products = await productsRepository.save(product);
    return userDB;
  }
}
