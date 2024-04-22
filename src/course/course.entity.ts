import { BaseEntity } from 'src/base/base.entity';
import { ClassEntity } from 'src/class/class.entity';
import { AfterLoad, Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'course' })
export class CourseEntity extends BaseEntity {
  @Column()
  from: number;

  @Column()
  to: number;

  @Column({ default: 0, name: 'agency_id' })
  agencyId?: number;

  courseName?: string;

  @AfterLoad()
  renderCourseName() {
    this.courseName = `${this.from}-${this.to}`;
  }

  @OneToMany(() => ClassEntity, (classList) => classList.course)
  public classList: ClassEntity[];
}
