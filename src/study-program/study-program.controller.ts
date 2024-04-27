import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateStudyProgramDto } from './dto/create-study-program.dto';
import { StudyProgramService } from './study-program.service';

@Controller('study-program')
export class StudyProgramController {
  constructor(private readonly studyProgramService: StudyProgramService) {}

  @Post()
  create(@Body() createStudyProgramDto: CreateStudyProgramDto) {
    return this.studyProgramService.create(createStudyProgramDto);
  }

  @Get()
  findAll() {
    return this.studyProgramService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studyProgramService.findOne({
      where: {
        id: +id,
      },
    });
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateStudyProgramDto: UpdateStudyProgramDto) {
  //   return this.studyProgramService.update(+id, updateStudyProgramDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.studyProgramService.remove(+id);
  // }
}
