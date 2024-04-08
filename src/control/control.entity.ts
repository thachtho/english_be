import { BaseEntity } from 'src/base/base.entity';
import { RoleControlEntity } from 'src/role_control/role_control.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'control' })
export class ControlEntity extends BaseEntity {
  @Column()
  path: string;

  @Column()
  name: string;

  @OneToMany(() => RoleControlEntity, (roleControl) => roleControl.control)
  public roleControls: RoleControlEntity[];
}
