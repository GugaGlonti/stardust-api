import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { AuthService } from '../../auth/auth.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private readonly authService: AuthService) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (token) {
      const user = await this.authService.me(token);
      request.currentUser = user;
    }

    return next.handle();
  }
}
