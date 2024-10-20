import { createParamDecorator, ExecutionContext } from '@nestjs/common';

const CurrentUser = createParamDecorator((data, context: ExecutionContext) => context.switchToHttp().getRequest().user);

export default CurrentUser;

