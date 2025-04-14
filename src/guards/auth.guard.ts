import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context).getContext();
    
    const tokenFromCookies = ctx.req.cookies?.refresh_token;
    const token = tokenFromCookies;

    if (!token) {
      throw new UnauthorizedException('No authentication token found');
    }

    try {
      ctx.user = this.authService.verifyToken(token);
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
