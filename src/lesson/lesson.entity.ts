import { BaseEntity } from 'src/base/base.entity';
import { UnitEntity } from 'src/unit/unit.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'lesson' })
export class LessonEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'unit_id' })
  unitId: number;

  @ManyToOne(() => UnitEntity, (unit) => unit.lesson)
  @JoinColumn({ name: 'unit_id' })
  public unit: UnitEntity;
}
