import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

interface JwtPayload {
  admin: boolean;
}

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const req: Request = ctx.getContext().req;
    const authHeader = req.headers['authorization'];

    if (!authHeader || Array.isArray(authHeader) || !authHeader.startsWith('Bearer')) {
      throw new UnauthorizedException('Missing or malformed Authorization header');
    }

    const token = authHeader.split(' ')[1];

    try {
      const payload = this.jwtService.verify<JwtPayload>(token, {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
      });

      ctx.getContext().user = payload;

      if (payload.admin !== true) {
        throw new UnauthorizedException('Insufficient permissions');
      }

      console.log('AdminGuard payload:', payload);
      return true;
    } catch (err) {
      if (err instanceof UnauthorizedException) {
        throw err; 
      }
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}