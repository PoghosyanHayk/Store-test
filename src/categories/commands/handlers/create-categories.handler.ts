import { CreateCategoriesCommand } from "../impl/create-categories.command";
import { ICommandHandler, CommandHandler, EventBus } from "@nestjs/cqrs";
import { getCustomRepository } from "typeorm";
import { CategoriesRepository } from "src/categories/repositories/categories.repository";
import { Categories } from "src/categories/categories.entity"


@CommandHandler(CreateCategoriesCommand)
export class CreateCategoriesHandler implements ICommandHandler<CreateCategoriesCommand> {
    constructor(
        private readonly eventBus: EventBus,
    ) { }

    async execute(command: CreateCategoriesCommand) {
        const { name, slug } = command;
        const productsRepository = getCustomRepository(CategoriesRepository);
 
        const product = productsRepository.create();
        product.name = name;
        product.slug = slug;


        
        const userDB: Categories = await productsRepository.save(product);
        
        
        // this.sendEvent(this.eventBus);
        
        return userDB;
    }

    // private async sendEvent(eventBus: EventBus) {
    //     // if(userId !== undefined) {
    //     //     console.log("send event CategoriesCreatedEvent");
    //         eventBus.publish(
    //             new CategoriesCreatedEvent(
    //                 Buffer.from(userId).toString('hex')));
    //     // }
    // }
}