import { BaseEntity } from 'src/base/base.entity';
import { ClassEntity } from 'src/class/class.entity';
import { UserEntity } from 'src/users/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'class_user' })
export class ClassToUserEntity extends BaseEntity {
  @Column({ name: 'class_id' })
  public classId: number;

  @Column({ name: 'user_id' })
  public userId: number;

  @ManyToOne(() => UserEntity, (user) => user.classToStudents)
  @JoinColumn({ name: 'user_id' })
  public user: UserEntity;

  @ManyToOne(() => ClassEntity, (classs) => classs.classToStudents)
  @JoinColumn({ name: 'class_id' })
  public class: ClassEntity;
}
