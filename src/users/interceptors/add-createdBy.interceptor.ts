import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { UsersService } from '../users.service';

@Injectable()
export class AddCreatedByInterceptor implements NestInterceptor {
  constructor(private userService: UsersService) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
    const { body, user } = context.switchToHttp().getRequest();

    if (body && user) {
      const response = await this.userService.findOne({
        where: {
          id: user?.userId,
        },
      });
      body.createdBy = user?.userId;
      body.agencyId = response?.agencyId;
    }
    return next.handle().pipe();
  }
}
