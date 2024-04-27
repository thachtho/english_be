import { BaseEntity } from 'src/base/base.entity';
import { LessonEntity } from 'src/lesson/lesson.entity';
import { StudyProgramEntity } from 'src/study-program/study-program.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'unit' })
export class UnitEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'study_program_id' })
  studyProgramId: number;

  @OneToMany(() => LessonEntity, (lesson) => lesson.unit)
  public lessons: LessonEntity[];

  @ManyToOne(() => StudyProgramEntity, (studyProgram) => studyProgram.units)
  @JoinColumn({ name: 'study_program_id' })
  public studyProgram: StudyProgramEntity;
}
