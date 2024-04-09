import { BaseEntity } from 'src/base/base.entity';
import { RoleControlEntity } from 'src/role_control/role_control.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity({ name: 'control' })
export class ControlEntity extends BaseEntity {
  @Column()
  path: string;

  @Column()
  name: string;

  @Column({ name: 'parent_id', nullable: true })
  parentId: string;

  @OneToMany(() => RoleControlEntity, (roleControl) => roleControl.control)
  public roleControls: RoleControlEntity[];

  @OneToMany(
    () => ControlEntity,
    (controlChildren) => controlChildren.controlParent,
  )
  public controlChildrens: ControlEntity[];

  @ManyToOne(() => ControlEntity, (controlParent) => controlParent.roleControls)
  @JoinColumn({ name: 'parent_id' })
  public controlParent: ControlEntity;
}
