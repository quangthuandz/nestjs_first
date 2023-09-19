import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { ReportsModule } from 'src/reports/reports.module';
import { UserSubject } from 'src/jointable/user-subject.entity';
import { SubjectsModule } from 'src/subjects/subjects.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserSubject]),forwardRef(() => ReportsModule),SubjectsModule],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
