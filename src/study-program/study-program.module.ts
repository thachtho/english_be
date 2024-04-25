import { Module } from '@nestjs/common';
import { StudyProgramService } from './study-program.service';
import { StudyProgramController } from './study-program.controller';
import { StudyProgramEntity } from './study-program.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([StudyProgramEntity])],
  controllers: [StudyProgramController],
  providers: [StudyProgramService],
})
export class StudyProgramModule {}
