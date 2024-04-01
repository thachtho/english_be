import { BaseEntity } from 'src/base/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'course' })
export class CourseEntity extends BaseEntity {
  @Column()
  from: number;

  @Column()
  to: number;

  @Column({ default: 0, name: 'agency_id' })
  agencyId?: number;
}
