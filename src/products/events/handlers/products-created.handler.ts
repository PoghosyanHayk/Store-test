import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { ProductsCreatedEvent } from "../impl/products-created.event";

@EventsHandler(ProductsCreatedEvent)
export class ProductsCreatedHandler implements 
    IEventHandler<ProductsCreatedEvent> {

    handle(event: ProductsCreatedEvent) {
        console.log('ProductsCreatedEvent...'
            + event.id );
    }
}