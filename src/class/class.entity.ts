import { BaseEntity } from 'src/base/base.entity';
import { ClassManagerEntity } from 'src/class-manager/class-manager.entity';
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

  @Column({ name: 'success', default: false })
  success: boolean;

  @OneToMany(() => ClassToUserEntity, (classToStudent) => classToStudent.class)
  public classToStudents: ClassToUserEntity[];

  @ManyToOne(() => UserEntity, (teacher) => teacher.classToStudents)
  @JoinColumn({ name: 'teacher_id' })
  public teacher: UserEntity;

  @ManyToOne(() => CourseEntity, (course) => course.classList)
  @JoinColumn({ name: 'course_id' })
  public course: CourseEntity;

  @OneToMany(() => ClassManagerEntity, (classManager) => classManager.class)
  public classManagers: ClassManagerEntity[];
}
