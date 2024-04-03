import { BaseEntity } from 'src/base/base.entity';
import { ClassToUserEntity } from 'src/class-user/class-user.entity';
import { ClassEntity } from 'src/class/class.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: true })
  fullname?: string;

  @Column()
  nickname: string;

  @Column()
  password: string;

  @Column({ default: 0 })
  role?: number;

  @Column({ default: 0, name: 'agency_id' })
  agencyId?: number;

  @OneToMany(() => ClassToUserEntity, (classToUser) => classToUser.user)
  public classToUsers: ClassToUserEntity[];

  @OneToMany(() => ClassEntity, (classs) => classs.teacher)
  public classList: ClassEntity[];
}
