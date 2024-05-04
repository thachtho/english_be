import { BaseEntity } from 'src/base/base.entity';
import { ClassManagerLessonEntity } from 'src/class-manager-lesson/class-manager-lesson.entity';
import { ClassEntity } from 'src/class/class.entity';
import { UnitEntity } from 'src/unit/unit.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity({ name: 'class-manager' })
export class ClassManagerEntity extends BaseEntity {
  @Column({ name: 'class_id' })
  public classId: number;

  @Column({ name: 'unit_id' })
  public unitId: number;

  @ManyToOne(() => ClassEntity, (classObject) => classObject.classManagers)
  @JoinColumn({ name: 'class_id' })
  public class: ClassEntity;

  @ManyToOne(() => UnitEntity)
  @JoinColumn({ name: 'unit_id' })
  unit: UnitEntity;

  @OneToMany(
    () => ClassManagerLessonEntity,
    (classManagerLesson) => classManagerLesson.classManager,
  )
  public classManagerLessons: ClassManagerLessonEntity[];
}
