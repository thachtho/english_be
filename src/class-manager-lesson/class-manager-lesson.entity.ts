import { ClassManagerEntity } from 'src/class-manager/class-manager.entity';
import { LessonEntity } from 'src/lesson/lesson.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'class-manager-lesson' })
export class ClassManagerLessonEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ name: 'class_manager_id' })
  public classManagerId: number;

  @Column({ name: 'lesson_id' })
  public lessonId: number;

  @Column({ name: 'active', default: false })
  public active: boolean;

  @ManyToOne(
    () => ClassManagerEntity,
    (classManager) => classManager.classManagerLessons,
  )
  @JoinColumn({ name: 'class_manager_id' })
  public classManager: ClassManagerEntity;

  @OneToOne(() => LessonEntity)
  @JoinColumn({ name: 'lesson_id' })
  lesson: LessonEntity;
}
