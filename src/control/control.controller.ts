import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ControlService } from './control.service';
import { CreateControlDto } from './dto/create-control.dto';

@Controller('control')
export class ControlController {
  constructor(private readonly controlService: ControlService) {}

  @Post()
  create(@Body() createControlDto: CreateControlDto) {
    return this.controlService.create(createControlDto);
  }

  @Get('path')
  findOne(@Query() query: { path: string }) {
    return this.controlService.findOne({
      where: {
        path: query?.path,
      },
      select: ['id', 'name'],
    });
  }
}
