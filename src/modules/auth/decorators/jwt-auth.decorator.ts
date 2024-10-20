import { applyDecorators, UseGuards } from '@nestjs/common';
//import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';

import JwtAuthGuard from '../guards/jwt-auth.guard';

export default function JwtAuth() {
  return applyDecorators(
    UseGuards(JwtAuthGuard),
    // ApiBearerAuth(),
    // ApiUnauthorizedResponse({
    //   description: 'Unauthorized',
    // }),
  );
}
