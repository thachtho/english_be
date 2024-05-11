import { Module } from '@nestjs/common';
import { ExerciseVariableService } from './exercise-variable.service';
import { ExerciseVariableController } from './exercise-variable.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExcerciseVariableEntity } from './exercise-variable.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExcerciseVariableEntity])],
  controllers: [ExerciseVariableController],
  providers: [ExerciseVariableService],
  exports: [ExerciseVariableService],
})
export class ExerciseVariableModule {}
