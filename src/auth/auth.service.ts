import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { USER_MODEL } from 'src/constants';
import { Users } from 'src/database/models/knowledge';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(USER_MODEL) private readonly user_table: typeof Users,
  ) {}

  async getUser(body: {
    email: string;
    password: string;
  }): Promise<{ token: string }> {
    const user = await this.user_table.findOne({
      where: { email: body.email },
    });

    if (user.password !== body.password) {
      throw new UnauthorizedException('Sorry bro... wrong pass)');
    }

    const token = this.jwtService.sign(user, {
      secret: process.env.JWT_SECRET,
    });

    return {
      token,
    };
  }

  // HMAC_SHA256(key: string | Buffer, secret: string) {
  //   return createHmac('sha256', key).update(secret);
  // }

  // getCheckString(data: URLSearchParams) {
  //   const items: [k: string, v: string][] = [];

  //   for (const [k, v] of data.entries()) if (k !== 'hash') items.push([k, v]);

  //   return items
  //     .sort(([a], [b]) => a.localeCompare(b))
  //     .map(([k, v]) => `${k}=${v}`)
  //     .join('\n');
  // }
}
