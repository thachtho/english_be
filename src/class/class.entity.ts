import { BaseEntity } from 'src/base/base.entity';
import { ClassToUserEntity } from 'src/class-user/class-user.entity';
import { UserEntity } from 'src/users/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

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

  @ManyToOne(() => UserEntity, (teacher) => teacher.classToUsers)
  @JoinColumn({ name: 'teacher_id' })
  public teacher: UserEntity;
}
