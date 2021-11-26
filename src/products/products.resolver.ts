import { Body } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Mutation, Resolver } from '@nestjs/graphql';
import { CreateProductsCommand } from './commands/impl/create-products.command';

export class CreatProducts {
  categoryId: number;
  slug: string;
  name: string;
  price: number;
}

@Resolver()
export class ProductsResolver {
  constructor(private commandBus: CommandBus) {}

  @Mutation('createProducts')
  public async createProducts(@Body('input') input: CreatProducts) {
    try {
      return await this.commandBus.execute(
        new CreateProductsCommand(
          input.categoryId,
          input.name,
          input.slug,
          input.price,
        ),
      );
    } catch (errors) {
      console.log(
        'Caught promise rejection (validation failed). Errors: ',
        errors,
      );
    }
  }
}
