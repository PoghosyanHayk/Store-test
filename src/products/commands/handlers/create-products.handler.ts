import { CreateProductsCommand } from "../impl/create-products.command";
import { ICommandHandler, CommandHandler, EventBus } from "@nestjs/cqrs";
// import { ProductsRepository } from "src/users/repositories/user.repository";
// import { v4 as uuidv4 } from 'uuid';
// import { ProductsCreatedEvent } from "src/users/events/impl/user-created.event";
import { getCustomRepository } from "typeorm";
import { ProductsRepository } from "src/products/repositories/user.repository";
import { Products } from "src/products/products.entity"


@CommandHandler(CreateProductsCommand)
export class CreateProductsHandler implements ICommandHandler<CreateProductsCommand> {
    constructor(
        private readonly eventBus: EventBus,
    ) { }

    async execute(command: CreateProductsCommand) {
        const { categoryId, name, slug, price } = command;
        const productsRepository = getCustomRepository(ProductsRepository);
 
        const product = productsRepository.create();
        product.categoryId = categoryId;
        product.name = name;
        product.slug = slug;
        product.price = price;
        const userDB: Products = await productsRepository.save(product);
        // this.sendEvent(this.eventBus);
        return userDB;
    }

    // private async sendEvent(eventBus: EventBus) {
    //     // if(userId !== undefined) {
    //     //     console.log("send event ProductsCreatedEvent");
    //         eventBus.publish(
    //             new ProductsCreatedEvent(
    //                 Buffer.from(userId).toString('hex')));
    //     // }
    // }
}