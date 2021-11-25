import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserRepository } from 'src/users/repositories/user.repository';
import { Users } from '../users/users.entity';

import { UsersService } from '../users/users.service';
import { jwtSecret } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly usersService: UsersService
        ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtSecret
        })
    }

    async validate(validationPayload: { email: string, sub: string }): Promise<UserRepository> | null {
        console.log("validationPayload", validationPayload)

        const user = await this.usersService.findOne(validationPayload.email)
        if (!user) {
            throw new UnauthorizedException()
        }
        return user;
    }
}