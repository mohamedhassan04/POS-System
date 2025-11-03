import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    // GraphQL context extraction
    const ctx = GqlExecutionContext.create(context);
    // Extracting request and mapping GraphQL args to req.body
    const req = ctx.getContext().req;
    // Map loginUserInput to req.body for Passport local strategy
    req.cookies = {
      access_token: req.cookies.access_token,
    };
    return req;
  }
}
