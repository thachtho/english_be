import { ClassEntity } from 'src/class/class.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
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

  @Column({ default: 1, name: 'class_id' })
  classId?: number;

  @Column({ name: 'created_by', default: 0 })
  createdBy?: number;

  @DeleteDateColumn({ name: 'delete_at' })
  deletedAt?: Date;

  @CreateDateColumn({ name: 'created_at' }) createdAt?: Date;
  @UpdateDateColumn({ name: 'updated_at' }) updatedAt?: Date;

  @ManyToOne(() => ClassEntity, (classs) => classs.students)
  @JoinColumn({ name: 'class_id' })
  class?: ClassEntity;
}
