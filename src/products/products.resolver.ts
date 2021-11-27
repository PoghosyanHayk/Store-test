import { Body } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  Args,
  Mutation,
  Resolver,
  Query,
  // ResolveField,
  // Parent,
} from '@nestjs/graphql';
// import { Categories } from 'src/categories/categories.entity';
// import { CategoriesService } from 'src/categories/categories.service';
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
  constructor(
    private commandBus: CommandBus,
    private readonly productsService: ProductsService,
    // private readonly categorService: CategoriesService,
  ) {}

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
  public async getProducts(
    @Args('slug', { type: () => String }) slug: string | '',
  ) {
    try {
      return await this.productsService.find(slug);
    } catch (errors) {
      console.log(
        'Caught promise rejection (validation failed). Errors: ',
        errors,
      );
    }
  }

  // @ResolveField()
  // async category(@Parent() category: Categories) {
  //   console.log("categorycategorycategory",category)
  //   const { id } = category;
  //   return this.categorService.findById(id);
  // }
}
