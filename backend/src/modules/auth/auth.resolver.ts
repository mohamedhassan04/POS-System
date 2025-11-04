import { HttpStatus, Request, UseGuards } from '@nestjs/common';
import { AuthenticationService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import {
  CurrentUserResponse,
  LoginResponse,
  LoginUserInput,
} from '../user/dto/login-user.input';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from 'src/shared/decorators/roles.decorator';

@Resolver()
export class AuthenticationResolver {
  constructor(private authService: AuthenticationService) {}

  //@desc Login user
  @Mutation(() => LoginResponse)
  @UseGuards(LocalAuthGuard)
  async login(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
    @Context() context: any,
  ): Promise<LoginResponse> {
    const { req, res } = context;
    const { success } = await this.authService.login(req.user, loginUserInput);
    res.cookie('access_token', success.access_token, success.name, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      path: '/',
      maxAge: 4 * 60 * 60 * 1000,
    });

    return {
      name: success.name,
      access_token: success.access_token,
    };
  }

  //@desc Get Current User
  @Query(() => CurrentUserResponse)
  @UseGuards(JwtAuthGuard)
  async current(@Context() context: any): Promise<CurrentUserResponse> {
    const { access_token } = context.req.cookies;
    const user = context.req?.user?.user;
    return {
      status: HttpStatus.OK,
      success: {
        id: user.id,
        name: user.username,
        access_token,
      },
    };
  }

  //@desc Logout from my account
  @Mutation(() => LoginResponse)
  async logout(@Context() context: any): Promise<LoginResponse> {
    const { res } = context;

    res.clearCookie('access_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    return {
      name: null,
      access_token: null,
    };
  }
}
