import { Module } from '@nestjs/common';
import { ClassUserService } from './class-user.service';
import { ClassUserController } from './class-user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassToUserEntity } from './class-user.entity';
import { IsClassUserAlreadyExistConstraint } from './validators/isUniqueClassUser';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([ClassToUserEntity]), UsersModule],
  controllers: [ClassUserController],
  providers: [ClassUserService, IsClassUserAlreadyExistConstraint],
  exports: [ClassUserService],
})
export class ClassUserModule {}
