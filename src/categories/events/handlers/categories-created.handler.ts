import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { CategoriesCreatedEvent } from "../impl/categories-created.event";

@EventsHandler(CategoriesCreatedEvent)
export class CategoriesCreatedHandler implements 
    IEventHandler<CategoriesCreatedEvent> {

    handle(event: CategoriesCreatedEvent) {
        console.log('CategoriesCreatedEvent...'
            + event.id );
    }
}