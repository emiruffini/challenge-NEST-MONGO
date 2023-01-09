import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUserCredentials(id: string): Promise<any> {
    //TODO implement password and username for login
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async loginWithCredentials(id: string) {
    const user = await this.validateUserCredentials(id);

    return {
      username: user.name,
      userId: user._id,
      picture: user.picture,
      access_token: this.jwtService.sign(user.toJSON()),
      expiredAt: Date.now() + 60000,
    };
  }
}
