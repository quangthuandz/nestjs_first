import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { ReportsModule } from './reports/reports.module';
import { SubjectsModule } from './subjects/subjects.module';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions),UsersModule, AuthModule, ReportsModule, SubjectsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
