import { Module, forwardRef } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { SubjectsController } from './subjects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from './subject.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Subject]),forwardRef(() => UsersModule)], 
  controllers: [SubjectsController],
  providers: [SubjectsService],
  exports: [SubjectsService]
})
export class SubjectsModule {}
