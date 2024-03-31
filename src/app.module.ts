import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgencyModule } from './agency/agency.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthGuard } from './auth/auth.guard';
import { AuthModule } from './auth/auth.module';
import { ClassModule } from './class/class.module';
import { ControlModule } from './control/control.module';
import { UsersModule } from './users/users.module';
import { RoleControlModule } from './role_control/role_control.module';
import { ClassUserModule } from './class-user/class-user.module';
import { CourseModule } from './course/course.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory() {
        return {
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: '111111',
          database: 'english',
          // entities: [UserEntity],
          synchronize: true,
          logging: 'all',
          autoLoadEntities: true,
          options: { encrypt: false },
        };
      },
    }),
    UsersModule,
    ClassModule,
    AgencyModule,
    AuthModule,
    ControlModule,
    RoleControlModule,
    ClassUserModule,
    CourseModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
