import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateVariableDto } from './dto/create-variable.dto';
import { VariableService } from './variable.service';
import { ROLE } from 'src/shared/enum';
import { Auth } from 'src/libs/guard/guard';
import { UpdateVariableDto } from './dto/update-variable.dto';

@Controller('variable')
export class VariableController {
  constructor(private readonly variableService: VariableService) {}

  @Post()
  @Auth([ROLE.TEACHER])
  create(@Body() createVariableDto: CreateVariableDto) {
    return this.variableService.create(createVariableDto);
  }

  @Delete(':id')
  @Auth([ROLE.TEACHER])
  remove(@Param('id') id: string) {
    return this.variableService.softDelete(+id);
  }

  @Put(':id')
  @Auth([ROLE.TEACHER])
  updateUser(@Param('id') id: ParseIntPipe, @Body() body: UpdateVariableDto) {
    return this.variableService.update(+id, body);
  }
}
