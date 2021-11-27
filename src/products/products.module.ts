import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesService } from 'src/categories/categories.service';
import { CategoriesRepository } from 'src/categories/repositories/categories.repository';
import { CreateProductsHandler } from './commands/handlers/create-products.handler';
import { ProductsCreatedEvent } from './events/impl/products-created.event';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';
import { ProductsRepository } from './repositories/products.repository';
export const CommandHandlers = [CreateProductsHandler];
export const QueryHandlers = [];
export const EventHandlers = [ProductsCreatedEvent];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([ProductsRepository, CategoriesRepository]),
  ],
  providers: [
    ProductsResolver,
    ...CommandHandlers,
    ...QueryHandlers,
    ...EventHandlers,
    ProductsService,
    CategoriesService,
  ],
  exports: [ProductsService, TypeOrmModule],
})
export class ProductsModule {}
