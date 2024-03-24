import { BaseEntity } from 'src/base/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'control' })
export class ControlEntity extends BaseEntity {
  @Column()
  path: string;

  @Column()
  name: string;
}
