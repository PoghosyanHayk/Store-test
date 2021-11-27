import { Body } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Mutation, Resolver, Query, Args } from '@nestjs/graphql';
import { Categories } from './categories.entity';
import { CategoriesService } from './categories.service';
import { CreateCategoriesCommand } from './commands/impl/create-categories.command';

export class CreatCategories {
  slug: string;
  name: string;
}

@Resolver()
export class CategoriesResolver {
  constructor(private commandBus: CommandBus, 
    private readonly categoriesService: CategoriesService,
    ) {}

  @Mutation('createCategories')
  public async createCategories(@Body('input') input: CreatCategories) {
    try {
      return await this.commandBus.execute(
        new CreateCategoriesCommand(
          input.name,
          input.slug,
        ),
      );
    } catch (errors) {
      console.log(
        'Caught promise rejection (validation failed). Errors: ',
        errors,
      );
    }
  }

  @Query(() => [Categories], { name: 'getCategories' })
  public async getCategories(
    @Args('slug', { type: () => String }) slug: string | '',
  ) {
    try {
      return await this.categoriesService.find(slug);
    } catch (errors) {
      console.log(
        'Caught promise rejection (validation failed). Errors: ',
        errors,
      );
    }
  }
}
