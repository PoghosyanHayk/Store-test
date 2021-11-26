import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateProductsHandler } from './commands/handlers/create-products.handler';
// import { CreateProductsHandler } from './commands/impl/create-products.command';
import { ProductsCreatedEvent } from './events/impl/products-created.event';
import { ProductsResolver } from './products.resolver';
import { ProductsRepository } from './repositories/user.repository';
// import { ProductsService } from './products.service';
export const CommandHandlers = [CreateProductsHandler];
export const QueryHandlers = [];
export const EventHandlers = [ProductsCreatedEvent];
// UserCreatedEvent
@Module({
  imports: [CqrsModule],
  providers: [
    ProductsRepository,
    ProductsResolver,
    ...CommandHandlers,
    ...QueryHandlers,
    ...EventHandlers,
  ],
})
export class ProductsModule {}
