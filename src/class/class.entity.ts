import { BaseEntity } from 'src/base/base.entity';
import { UserEntity } from 'src/users/user.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'class' })
export class ClassEntity extends BaseEntity {
  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'agency_id' })
  agencyId: number;

  @Column({ name: 'teacher_id' })
  teacherId: number;

  @OneToMany(() => UserEntity, (students) => students.class)
  students: UserEntity[];
}
