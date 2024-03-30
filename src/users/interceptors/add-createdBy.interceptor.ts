import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { UsersService } from '../users.service';
import { IMethodRequest } from 'src/shared/enum';

@Injectable()
export class AddCreatedByInterceptor implements NestInterceptor {
  constructor(private userService: UsersService) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
    const { body, user, method } = context.switchToHttp().getRequest();

    if (method === IMethodRequest.POST && user) {
      const response = await this.userService.findOne({
        where: {
          id: user?.id,
        },
      });
      body.createdBy = response?.id;
      body.agencyId = response?.agencyId;
    }
    return next.handle().pipe();
  }
}
