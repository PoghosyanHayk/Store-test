import { Mutation, Resolver, GqlExecutionContext } from '@nestjs/graphql';
import { CommandBus } from '@nestjs/cqrs';
import { createParamDecorator, ExecutionContext, Body, UseGuards, Query } from '@nestjs/common';
import { CreateUserCommand } from './users/commands/impl/create-user.command';
import { LocalAuthGuard } from './auth/local-aut.guard';
import { AuthPayload } from 'graphql.schema';
import { JwtService } from '@nestjs/jwt';

export const CurrentUser = createParamDecorator(
    (data: unknown, context: ExecutionContext) => {
      const ctx = GqlExecutionContext.create(context);
      const request  = ctx.getContext();
        console.log("request",request)
      request.body = ctx.getArgs();
      return request.body;
    },
);

export class SignUp { 
    email: string;
    username: string;
    password: string;
};

@Resolver ('App')
export class AppResolver { 

    constructor(
        private commandBus: CommandBus,
        private readonly jwtService: JwtService,
    ) {}


    @Mutation('signup')
    public async signup(@Body('input') input: SignUp ) {
        
        try {
            return await this.commandBus.execute( 
                new CreateUserCommand(input.username, 
                   input.email, input.password));
        } catch (errors) {
            console.log("Caught promise rejection (validation failed). Errors: ", errors);
        }
    }

    // @UseGuards(LocalAuthGuard)
    @Mutation('login')
    public async login(@CurrentUser() req ): Promise<AuthPayload> {
        console.log(22222,req)
        const payload = {
            email: req.email,
            sub: 'awdawd'
        }

        return {
            email: req.email, 
            accessToken: this.jwtService.sign(payload),
        };
    }
}