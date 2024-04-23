import { BaseEntity } from 'src/base/base.entity';
import { LessonEntity } from 'src/lesson/lesson.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'unit' })
export class UnitEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'block_id' })
  blockId: number;

  @OneToMany(() => LessonEntity, (lesson) => lesson.unit)
  public lessons: LessonEntity[];
}
