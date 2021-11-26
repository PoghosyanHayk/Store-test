import { Module } from '@nestjs/common';
import {  CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateProductsHandler } from './commands/handlers/create-products.handler';
// import { CreateProductsHandler } from './commands/impl/create-products.command';
import { ProductsCreatedEvent } from './events/impl/products-created.event';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';
import { ProductsRepository } from './repositories/products.repository';
// import { ProductsService } from './products.service';
export const CommandHandlers = [CreateProductsHandler];
export const QueryHandlers = [];
export const EventHandlers = [ProductsCreatedEvent];
// UserCreatedEvent
@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([ProductsRepository]) ],
  providers: [
    ProductsResolver,
    ...CommandHandlers,
    ...QueryHandlers,
    ...EventHandlers,
    ProductsService
  ],
  exports: [ProductsService, TypeOrmModule],
})
export class ProductsModule {}
