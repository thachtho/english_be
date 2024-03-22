import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
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

  @DeleteDateColumn({ name: 'delete_at' })
  deletedAt?: Date;

  @CreateDateColumn({ name: 'created_at' }) createdAt?: Date;
  @UpdateDateColumn({ name: 'updated_at' }) updatedAt?: Date;
}
