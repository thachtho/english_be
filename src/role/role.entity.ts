import { BaseEntity } from 'src/base/base.entity';
import { RoleControlEntity } from 'src/role_control/role_control.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'role' })
export class RoleEntity extends BaseEntity {
  @Column({ name: 'name' })
  name: string;

  @OneToMany(() => RoleControlEntity, (roleControl) => roleControl.role)
  public roleControls: RoleControlEntity[];
}
