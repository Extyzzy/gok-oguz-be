import { applyDecorators, UseGuards } from '@nestjs/common';

import JwtRefreshAuthGuard from '../guards/jwt-refresh-auth.guard';

export default function JwtRefresh() {
  return applyDecorators(UseGuards(JwtRefreshAuthGuard));
}
