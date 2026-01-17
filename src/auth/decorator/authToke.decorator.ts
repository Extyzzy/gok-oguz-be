import { createParamDecorator, ExecutionContext } from '@nestjs/common';

const AuthToken = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const authHeader = (
      request.headers as unknown as Record<string, string | undefined>
    ).authorization;

    if (!authHeader) {
      return null;
    }

    // Bearer <token> structure
    return authHeader.split(' ')[1];
  },
);

export default AuthToken;
