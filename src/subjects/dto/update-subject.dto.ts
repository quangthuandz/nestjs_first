import { PartialType } from '@nestjs/mapped-types';
import { CreateSubjectDto } from './create-subject.dto';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class UpdateSubjectDto extends PartialType(CreateSubjectDto) {

    @Expose()
    @IsString()
    name: string

    @Expose()
    @IsString()
    description: string
}
