import { Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
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
import { ClassUserModule } from './class-user/class-student.module';
import { CourseModule } from './course/course.module';
import { ClsModule } from 'nestjs-cls';
import { RoleModule } from './role/role.module';
import { UnitModule } from './unit/unit.module';
import { LessonModule } from './lesson/lesson.module';
import { StudyProgramModule } from './study-program/study-program.module';
import { VariableModule } from './variable/variable.module';
import { AddCreatedByInterceptor } from './users/interceptors/add-createdBy.interceptor';

@Module({
  imports: [
    ClsModule.forRoot({
      middleware: {
        mount: true,
      },
    }),
    TypeOrmModule.forRootAsync({
      useFactory() {
        return {
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: '111111',
          database: 'english',
          synchronize: true,
          // logging: 'all',
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
    RoleModule,
    UnitModule,
    LessonModule,
    StudyProgramModule,
    VariableModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: AddCreatedByInterceptor,
    },
  ],
})
export class AppModule {}
