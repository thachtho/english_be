import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ name: 'created_by', default: 0 })
  createdBy?: number;

  @DeleteDateColumn({ name: 'delete_at' })
  deletedAt?: Date;

  @CreateDateColumn({ name: 'created_at' }) createdAt?: Date;
  @UpdateDateColumn({ name: 'updated_at' }) updatedAt?: Date;
}
