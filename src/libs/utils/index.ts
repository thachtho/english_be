import { HttpException, HttpStatus } from '@nestjs/common';
import { ClsServiceManager } from 'nestjs-cls';
import { UserEntity } from 'src/users/user.entity';

const getUserCls = (): UserEntity => {
  const user = ClsServiceManager.getClsService().get('user');

  return JSON.parse(user);
};

const throwErrorExceptionInput = (input: any) => {
  if (typeof input === 'object') {
    for (const key in input) {
      checkUndefined(input[key]);
    }

    return;
  }

  checkUndefined(input);
};

const checkUndefined = (input: any) => {
  if (input === undefined) {
    throw new HttpException(
      'Dữ liệu đầu vào không hợp lệ',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
};

export { getUserCls, throwErrorExceptionInput };
