import { BaseEntity } from 'src/base/base.entity';
import { LessonEntity } from 'src/lesson/lesson.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'variable' })
export class VariableEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  vi: string;

  @Column({ name: 'lesson_id' })
  lessonId: number;

  @ManyToOne(() => LessonEntity, (lesson) => lesson.variables)
  @JoinColumn({ name: 'lesson_id' })
  public lesson: LessonEntity;
}
