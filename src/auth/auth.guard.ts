import { Injectable } from '@nestjs/common';
import type { CanActivate, ExecutionContext } from '@nestjs/common';
import type { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { Repository } from 'typeorm';
import type { User } from 'src/db/entities/user.entity';

@Injectable() 
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userRepository: Repository<User>,
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
      const payload = this.jwtService.verify(token);
      const user = this.userRepository.findOneBy({
        id: payload.id,
      });
      if (!user) {
        throw new HttpException('User unauthorized', HttpStatus.UNAUTHORIZED);
      }
      req.user = user;
      return true;
    } catch (error) {
      throw new HttpException('User unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }
}
