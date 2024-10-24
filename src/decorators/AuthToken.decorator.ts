import { createParamDecorator, ExecutionContext } from '@nestjs/common';

const AuthToken = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return null;
    }

    // Bearer <token> structure
    return authHeader.split(' ')[1];
  },
);

export default AuthToken;
