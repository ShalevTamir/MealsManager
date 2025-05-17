import { createParamDecorator, ExecutionContext } from '@nestjs/common';

const PROFILE_USERNAME_HEADER = 'profile-username';

export const ProfileUsername = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();    
    return request.headers[PROFILE_USERNAME_HEADER] || null;;
  },
);