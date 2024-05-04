import { PartialType } from '@nestjs/mapped-types';
import { CreateClassManagerLessonDto } from './create-class-manager-lesson.dto';

export class UpdateClassManagerLessonDto extends PartialType(CreateClassManagerLessonDto) {}
