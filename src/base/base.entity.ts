import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @DeleteDateColumn({ name: 'delete_at' })
  deletedAt?: Date;

  @CreateDateColumn({ name: 'created_at' }) createdAt?: Date;
  @UpdateDateColumn({ name: 'updated_at' }) updatedAt?: Date;
}
