import { Body} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Args, Mutation, Resolver, Query  } from '@nestjs/graphql';
import { CreateProductsCommand } from './commands/impl/create-products.command';
import { Products } from './products.entity';
import { ProductsService } from './products.service';

export class CreatProducts {
  category_id: number;
  slug: string;
  name: string;
  price: number;
}

@Resolver()
export class ProductsResolver {
  constructor(private commandBus: CommandBus, private readonly productsService: ProductsService) {}

  @Mutation('createProducts')
  public async createProducts(@Body('input') input: CreatProducts) {
    try {
      return await this.commandBus.execute(
        new CreateProductsCommand(
          input.category_id,
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

  @Query(() => [Products], { name: 'getProducts' })
  public async getProducts(@Args('slug', { type: () => String }) slug: string) {
    try {
        return await this.productsService.find();
    } catch (errors) {
        console.log(
            'Caught promise rejection (validation failed). Errors: ',
            errors,
        );
    }
  }
}
