import { BaseEntity } from 'src/base/base.entity';
import { UnitEntity } from 'src/unit/unit.entity';
import { VariableEntity } from 'src/variable/variable.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity({ name: 'lesson' })
export class LessonEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({ name: 'unit_id' })
  unitId: number;

  @ManyToOne(() => UnitEntity, (unit) => unit.lessons)
  @JoinColumn({ name: 'unit_id' })
  public unit: UnitEntity;

  @OneToMany(() => VariableEntity, (variable) => variable.lesson)
  public variables: VariableEntity[];
}
