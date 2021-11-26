import { CreateUserCommand } from "../impl/create-user.command";
import { ICommandHandler, CommandHandler, EventBus } from "@nestjs/cqrs";
import { UserRepository } from "src/users/repositories/user.repository";
import { v4 as uuidv4 } from 'uuid';
import { UserCreatedEvent } from "src/users/events/impl/user-created.event";
import { getCustomRepository } from "typeorm";
import { Users } from "src/users/users.entity";


@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
    constructor(
        private readonly eventBus: EventBus,
    ) { }

    async execute(command: CreateUserCommand) {

        const { username, email, password } = command;
        const userRepository = getCustomRepository(UserRepository);
 
        const user = userRepository.create();
        user.userId = uuidv4();
        user.username = username;
        user.email = email;
        user.password = password;
        
        const userDB: Users = await userRepository.save(user);
        
        
        this.sendEvent(userDB.userId, this.eventBus);
        
        return userDB;
    }

    private async sendEvent(userId: string, eventBus: EventBus) {
        console.log("bbbbbbb")
        
        if(userId !== undefined) {
            console.log("send event UserCreatedEvent");
            eventBus.publish(
                new UserCreatedEvent(
                    Buffer.from(userId).toString('hex')));
        }
    }
}