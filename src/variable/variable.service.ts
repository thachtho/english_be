import { Injectable } from '@nestjs/common';
import { CreateVariableDto } from './dto/create-variable.dto';
import { UpdateVariableDto } from './dto/update-variable.dto';
import { throwErrorExceptionInput } from 'src/libs/utils';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VariableEntity } from './variable.entity';

@Injectable()
export class VariableService {
  constructor(
    @InjectRepository(VariableEntity)
    private repo: Repository<VariableEntity>,
  ) {}

  create(createVariableDto: CreateVariableDto) {
    return 'This action adds a new variable';
  }

  findAll() {
    return `This action returns all variable`;
  }

  findOne(id: number) {
    return `This action returns a #${id} variable`;
  }

  update(id: number, updateVariableDto: UpdateVariableDto) {
    return `This action updates a #${id} variable`;
  }

  remove(id: number) {
    return `This action removes a #${id} variable`;
  }
}
