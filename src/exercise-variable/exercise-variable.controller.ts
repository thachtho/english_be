import { Body, Controller, Param, ParseIntPipe, Put } from '@nestjs/common';
import { ExerciseVariableService } from './exercise-variable.service';
import { UpdateExerciseVariableDto } from './dto/update-exercise-variable.dto';

@Controller('exercise-variable')
export class ExerciseVariableController {
  constructor(
    private readonly exerciseVariableService: ExerciseVariableService,
  ) {}

  @Put(':id')
  updateUser(
    @Param('id') id: ParseIntPipe,
    @Body() body: UpdateExerciseVariableDto,
  ) {
    return this.exerciseVariableService.update(+id, body);
  }
}
