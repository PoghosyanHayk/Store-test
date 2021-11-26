import { Body } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Mutation, Resolver } from '@nestjs/graphql';
import { CreateCategoriesCommand } from './commands/impl/create-categories.command';

export class CreatCategories {
  slug: string;
  name: string;
}

@Resolver()
export class CategoriesResolver {
  constructor(private commandBus: CommandBus) {}

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
}
