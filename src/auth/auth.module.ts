import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { config } from 'src/config';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: config.token.secretKey,
      signOptions: {
        expiresIn: config.token.expiresIn,
      },
    }),
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
