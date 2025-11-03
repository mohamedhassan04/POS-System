import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  getRequest(context: ExecutionContext) {
    // GraphQL context extraction
    const ctx = GqlExecutionContext.create(context);
    // Extracting request and mapping GraphQL args to req.body
    const req = ctx.getContext().req;
    // Extract loginUserInput from GraphQL arguments
    const { loginUserInput } = ctx.getArgs();
    // Map loginUserInput to req.body for Passport local strategy
    req.body = {
      username: loginUserInput.username,
      password: loginUserInput.password,
    };
    return req;
  }
}
