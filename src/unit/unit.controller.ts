import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UnitService } from './unit.service';
import { Auth } from 'src/libs/guard/guard';
import { ROLE } from 'src/shared/enum';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';

@Controller('unit')
export class UnitController {
  constructor(private readonly unitService: UnitService) {}
  @Get()
  @Auth([ROLE.TEACHER])
  findAll() {
    return this.unitService.findAll();
  }

  @Get('/unit-by-studyProgramId/:id')
  @Auth([ROLE.TEACHER])
  findAllUnitLessons(@Param('id') studyProgramId: string) {
    return this.unitService.findByStudyProgramId(+studyProgramId);
  }

  @Post()
  @Auth([ROLE.TEACHER])
  create(@Body() createUnitDto: CreateUnitDto) {
    return this.unitService.create(createUnitDto);
  }

  @Put(':id')
  @Auth([ROLE.TEACHER])
  updateUser(@Param('id') id: ParseIntPipe, @Body() body: UpdateUnitDto) {
    return this.unitService.update(+id, body);
  }

  @Delete(':id')
  @Auth([ROLE.TEACHER])
  remove(@Param('id') id: string) {
    return this.unitService.softDelete(+id);
  }
}
