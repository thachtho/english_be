import { BaseEntity } from 'src/base/base.entity';
import { ClassToUserEntity } from 'src/class-user/class-student.entity';
import { CourseEntity } from 'src/course/course.entity';
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

  @Column({ name: 'block_id' })
  blockId: number;

  @OneToMany(() => ClassToUserEntity, (classToStudent) => classToStudent.class)
  public classToStudents: ClassToUserEntity[];

  @ManyToOne(() => UserEntity, (teacher) => teacher.classToStudents)
  @JoinColumn({ name: 'teacher_id' })
  public teacher: UserEntity;

  @ManyToOne(() => CourseEntity, (course) => course.classList)
  @JoinColumn({ name: 'course_id' })
  public course: CourseEntity;
}
