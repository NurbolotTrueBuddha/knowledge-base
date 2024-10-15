import {
  Injectable,
  ExecutionContext,
  Logger,
  CanActivate,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class HttpAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return false;
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });

      if (decoded) {
        const user = decoded;

        if (user) {
          request['user'] = user;
          return true;
        } else {
          return false;
        }
      }
    } catch (err) {
      Logger.error('HttpAuthGuard', err);
      return false;
    }

    return false;
  }
}
