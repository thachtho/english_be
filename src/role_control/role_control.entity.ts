import { BaseEntity } from 'src/base/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'role_control' })
export class RoleControlEntity extends BaseEntity {
  @Column({ name: 'role_id' })
  roleId: number;

  @Column({ name: 'control_id' })
  controlId: string;
}
