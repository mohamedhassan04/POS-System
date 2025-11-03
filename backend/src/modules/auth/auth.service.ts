import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { LoginUserInput } from '../user/dto/login-user.input';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  /* Validate user credentials */
  async validateUser(username: string, password: string) {
    const user = await this.userService.findOneUserByUsername(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  /* Login function */
  async login(user: User, loginUserInput: LoginUserInput) {
    const payload = {
      username: loginUserInput.username,
      sub: {
        id: user.id,
        username: loginUserInput.username,
        role: user.role,
      },
    };
    return {
      status: 200,
      success: {
        name: user.username,
        access_token: this.jwtService.sign(payload),
      },
    };
  }
}
