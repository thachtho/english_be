import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { ExerciseService } from './exercise.service';

@Controller('exercise')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Post()
  create(@Body() createExerciseDto: CreateExerciseDto) {
    return this.exerciseService.createExerise(createExerciseDto);
  }
  @Get('get-exercise-by-classManagerLessonId/:id')
  getExerciseByClassManagerLessonId(@Param('id') id: ParseIntPipe) {
    return this.exerciseService.getExerciseByClassManagerLessonId(+id);
  }
}
