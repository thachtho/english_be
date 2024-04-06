import { ClsServiceManager } from 'nestjs-cls';
import { UserEntity } from 'src/users/user.entity';

const getUserCls = (): UserEntity => {
  const user = ClsServiceManager.getClsService().get('user');

  return JSON.parse(user);
};

export { getUserCls };
