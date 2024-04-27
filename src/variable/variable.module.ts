import { Module } from '@nestjs/common';
import { VariableService } from './variable.service';
import { VariableController } from './variable.controller';
import { VariableEntity } from './variable.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([VariableEntity])],
  controllers: [VariableController],
  providers: [VariableService],
})
export class VariableModule {}
