import { BaseEntity } from 'src/base/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'study-program' })
export class StudyProgramEntity extends BaseEntity {
  @Column({ name: 'role_id' })
  name: string;

  @Column({ name: 'control_id' })
  blockId: number;
}
