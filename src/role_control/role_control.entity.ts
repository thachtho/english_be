import { BaseEntity } from 'src/base/base.entity';
import { ControlEntity } from 'src/control/control.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'role_control' })
export class RoleControlEntity extends BaseEntity {
  @Column({ name: 'role_id' })
  roleId: number;

  @Column({ name: 'control_id' })
  controlId: string;

  @ManyToOne(() => ControlEntity, (control) => control.roleControls)
  @JoinColumn({ name: 'control_id' })
  public control: ControlEntity;

  @ManyToOne(() => ControlEntity, (role) => role.roleControls)
  @JoinColumn({ name: 'role_id' })
  public role: ControlEntity;
}
