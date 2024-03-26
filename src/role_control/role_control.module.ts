import { Module } from '@nestjs/common';
import { RoleControlService } from './role_control.service';
import { RoleControlController } from './role_control.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleControlEntity } from './role_control.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoleControlEntity])],
  controllers: [RoleControlController],
  providers: [RoleControlService],
})
export class RoleControlModule {}
