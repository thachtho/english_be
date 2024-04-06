import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassModule } from 'src/class/class.module';
import { UsersModule } from 'src/users/users.module';
import { ClassUserController } from './class-student.controller';
import { ClassToUserEntity } from './class-student.entity';
import { ClassUserService } from './class-student.service';
import { IsClassUserAlreadyExistConstraint } from './validators/isUniqueClassUser';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClassToUserEntity]),
    UsersModule,
    ClassModule,
  ],
  controllers: [ClassUserController],
  providers: [ClassUserService, IsClassUserAlreadyExistConstraint],
  exports: [ClassUserService],
})
export class ClassUserModule {}
