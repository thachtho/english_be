import { Module } from '@nestjs/common';
import { ClassService } from './class.service';
import { ClassController } from './class.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassEntity } from './class.entity';
import { UsersModule } from 'src/users/users.module';
import { IsClassAlreadyExistConstraint } from './validators/isClassUnique';

@Module({
  imports: [TypeOrmModule.forFeature([ClassEntity]), UsersModule],
  controllers: [ClassController],
  providers: [ClassService, IsClassAlreadyExistConstraint],
  exports: [ClassService],
})
export class ClassModule {}
