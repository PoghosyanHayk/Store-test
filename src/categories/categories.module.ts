import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateCategoriesHandler } from './commands/handlers/create-categories.handler';
// import { CreateCategoriesHandler } from './commands/impl/create-categories.command';
import { CategoriesCreatedEvent } from './events/impl/categories-created.event';
import { CategoriesResolver } from './categories.resolver';
import { CategoriesRepository } from './repositories/categories.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsRepository } from 'src/products/repositories/products.repository';
import { ProductsService } from 'src/products/products.service';
import { CategoriesService } from './categories.service';
export const CommandHandlers = [CreateCategoriesHandler];
export const QueryHandlers = [];
export const EventHandlers = [CategoriesCreatedEvent];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([ProductsRepository, CategoriesRepository]),
  ],
  providers: [
    CategoriesResolver,
    ...CommandHandlers,
    ...QueryHandlers,
    ...EventHandlers,
    ProductsService,
    CategoriesService,
  ],
  exports: [CategoriesService, TypeOrmModule],
})
export class CategoriesModule {}
