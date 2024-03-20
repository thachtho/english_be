import { DeepPartial, DeleteResult, FindOneOptions, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { HttpException, HttpStatus } from '@nestjs/common';

export class BaseService<T> {
  constructor(private readonly repository: Repository<T>) {}

  async findAll(): Promise<T[]> {
    return await this.repository.find();
  }

  async findOne(options: FindOneOptions<T>): Promise<T> {
    return this.repository.findOne(options);
  }

  async create(data: DeepPartial<T> ) {
   return await this.repository.save(data);
  }

  async update(id: number, partialEntity: QueryDeepPartialEntity<T>) {
   return await this.repository.update(id, partialEntity);
  }

  async softDelete(id: number): Promise<void> {
    await this.repository.softDelete(id);
  }
}
