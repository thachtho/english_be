import { Module } from '@nestjs/common';
import { ClassManagerService } from './class-manager.service';
import { ClassManagerController } from './class-manager.controller';
import { ClassManagerEntity } from './class-manager.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassModule } from 'src/class/class.module';

@Module({
  imports: [TypeOrmModule.forFeature([ClassManagerEntity]), ClassModule],
  controllers: [ClassManagerController],
  providers: [ClassManagerService],
})
export class ClassManagerModule {}
