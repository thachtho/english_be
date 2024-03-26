import { Module } from '@nestjs/common';
import { AgencyService } from './agency.service';
import { AgencyController } from './agency.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgencyEntity } from './agency.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AgencyEntity])],
  controllers: [AgencyController],
  providers: [AgencyService],
})
export class AgencyModule {}
