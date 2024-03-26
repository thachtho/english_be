import { BaseEntity } from 'src/base/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'agency' })
export class AgencyEntity extends BaseEntity {
  @Column()
  name: string;
}
