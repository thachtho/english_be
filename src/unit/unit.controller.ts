import { Controller, Get } from '@nestjs/common';
import { UnitService } from './unit.service';
import { Auth } from 'src/libs/guard/guard';
import { ROLE } from 'src/shared/enum';

@Controller('unit')
export class UnitController {
  constructor(private readonly unitService: UnitService) {}
  @Get()
  @Auth([ROLE.TEACHER])
  findAll() {
    return this.unitService.findAll();
  }

  @Get('/unit-lesson')
  @Auth([ROLE.TEACHER])
  findAllUnitLessons() {
    return this.unitService.findAllUnitLessons();
  }
}
