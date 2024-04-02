import { BaseEntity } from 'src/base/base.entity';
import { ClassToUserEntity } from 'src/class-user/class-user.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'class' })
export class ClassEntity extends BaseEntity {
  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'agency_id' })
  agencyId: number;

  @Column({ name: 'teacher_id' })
  teacherId: number;

  @Column({ name: 'course_id' })
  courseId: number;

  @OneToMany(() => ClassToUserEntity, (classToUser) => classToUser.class)
  public classToUsers: ClassToUserEntity[];

  // @OneToMany(() => UserEntity, (students) => students.class)
  // students: UserEntity[];
}
