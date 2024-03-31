import { Module } from '@nestjs/common';
import { ClassUserService } from './class-user.service';
import { ClassUserController } from './class-user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassToUserEntity } from './class-user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClassToUserEntity])],
  controllers: [ClassUserController],
  providers: [ClassUserService],
})
export class ClassUserModule {}
