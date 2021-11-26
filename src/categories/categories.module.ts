import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateCategoriesHandler } from './commands/handlers/create-categories.handler';
// import { CreateCategoriesHandler } from './commands/impl/create-categories.command';
import { CategoriesCreatedEvent } from './events/impl/categories-created.event';
import { CategoriesResolver } from './categories.resolver';
import { CategoriesRepository } from './repositories/categories.repository';
// import { CategoriesService } from './categories.service';
export const CommandHandlers = [CreateCategoriesHandler];
export const QueryHandlers = [];
export const EventHandlers = [CategoriesCreatedEvent];
// UserCreatedEvent
@Module({
  imports: [CqrsModule],
  providers: [
    CategoriesRepository,
    CategoriesResolver,
    ...CommandHandlers,
    ...QueryHandlers,
    ...EventHandlers,
  ],
})
export class CategoriesModule {}
