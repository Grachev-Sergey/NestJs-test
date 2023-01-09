import { Injectable } from '@nestjs/common';
import type { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import type { Observable } from 'rxjs';
import { Repository } from 'typeorm';

import { User } from '../db/entities/user.entity';
import config from '../config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader.split(' ')[1];
      if (!token) {
        throw new HttpException('User unauthorized', HttpStatus.UNAUTHORIZED);
      }
      return this.validate(req, token);
    } catch {
      throw new HttpException('User unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }

  async validate(req, token: string): Promise<boolean> {
    try {
      const payload = this.jwtService.verify(token, {
        secret: config.token.access.secretKey,
      });
      const user = await this.userRepository.findOneBy({ id: payload.id });
      if (!user) {
        throw new HttpException('User unauthorized', HttpStatus.UNAUTHORIZED);
      }
      req.user = user;
      return true;
    } catch {
      throw new HttpException('User unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }
}
