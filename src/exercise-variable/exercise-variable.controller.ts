import { Controller } from '@nestjs/common';
import { ExerciseVariableService } from './exercise-variable.service';

@Controller('exercise-variable')
export class ExerciseVariableController {
  constructor(
    private readonly exerciseVariableService: ExerciseVariableService,
  ) {}
}
