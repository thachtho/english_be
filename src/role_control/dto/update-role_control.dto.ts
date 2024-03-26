import { PartialType } from '@nestjs/mapped-types';
import { CreateRoleControlDto } from './create-role_control.dto';

export class UpdateRoleControlDto extends PartialType(CreateRoleControlDto) {}
