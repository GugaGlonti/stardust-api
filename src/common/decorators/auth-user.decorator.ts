import { createParamDecorator } from '@nestjs/common';

export const AuthUser = createParamDecorator((data, req) => {
  console.log(req.user);
  return req.user;
});
