import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import config from 'src/config';
import { User } from 'src/db/entities/user.entity';
import { Utils } from 'src/utils';
import { AuthController } from './auth.controller';
import { CommandHandlers } from './commands/handlers';

@Module({
  controllers: [AuthController],
  providers: [...CommandHandlers, Utils],
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: config.token.secretKey,
      signOptions: {
        expiresIn: config.token.expiresIn,
      },
    }),
  ],
  exports: [JwtModule],
})
export class AuthModule {}
