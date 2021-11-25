import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PerformLoginHandler } from './commands/handlers/perform-login.handler';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtSecret } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';

export const CommandHandlers = [PerformLoginHandler];
export const QueryHandlers = [];
export const EventHandlers = [];
@Module({
  imports: [
    CqrsModule,
    UsersModule,
    PassportModule.register({ defaultStrategy: 'local' }),
    TypeOrmModule.forFeature([]),
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [
    JwtStrategy,
    LocalStrategy,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
  ],
  exports: [],
})
export class AuthModule {}
