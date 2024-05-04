import { PartialType } from '@nestjs/mapped-types';
import { CreateClassManagerDto } from './create-class-manager.dto';

export class UpdateClassManagerDto extends PartialType(CreateClassManagerDto) {}
