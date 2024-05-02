import { Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClsModule } from 'nestjs-cls';
import { AgencyModule } from './agency/agency.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthGuard } from './auth/auth.guard';
import { AuthModule } from './auth/auth.module';
import { ClassUserModule } from './class-user/class-student.module';
import { ClassModule } from './class/class.module';
import { ControlModule } from './control/control.module';
import { CourseModule } from './course/course.module';
import { LessonModule } from './lesson/lesson.module';
import { RoleModule } from './role/role.module';
import { RoleControlModule } from './role_control/role_control.module';
import { StudyProgramModule } from './study-program/study-program.module';
import { UnitModule } from './unit/unit.module';
import { AddInfoUserRequestInterceptor } from './users/interceptors/add-info-user-request.interceptor';
import { UsersModule } from './users/users.module';
import { VariableModule } from './variable/variable.module';

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
          host: '103.214.10.223',
          port: 3307,
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
      useClass: AddInfoUserRequestInterceptor,
    },
  ],
})
export class AppModule {}
