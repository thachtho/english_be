import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ClassModule } from './class/class.module';
import { AgencyModule } from './agency/agency.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './users/user.entity';

@Module({
  imports: [ 
    TypeOrmModule.forRootAsync({
      useFactory() {
        return {
          type: 'mysql',
          host: 'localhost',
          port: 3307,
          username: 'root',
          password: '111111',
          database: 'english',
          entities: [UserEntity],
          synchronize: true,
          logging: "all",
          autoLoadEntities: true,
          options: { encrypt: false },
        };
      }
    })
    ,UsersModule, ClassModule, AgencyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
