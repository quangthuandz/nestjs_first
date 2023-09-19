import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { Subject } from './subject.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SubjectsService {
  constructor(@InjectRepository(Subject)
  private readonly subjectRepository: Repository<Subject>){}
  
  create(createSubjectDto: CreateSubjectDto) {
    const subject = this.subjectRepository.create(createSubjectDto);
    return this.subjectRepository.save(subject);
  }

  findAll() {
    return this.subjectRepository.find();
  }

  findOne(id: number) {
    return this.subjectRepository.findOne({ where: { id } });
  }

  async update(id: number, attrs: Partial<Subject>) {
    const subject = await this.findOne(id);
    if(!subject){
      throw new NotFoundException('subject not found!!!')
    }
    Object.assign(subject,attrs)
    return this.subjectRepository.save(subject);
  }

  async remove(id: number) {
    const subject = await this.findOne(id);
    if(!subject){
      throw new NotFoundException('subject not found!!!')
    }
    return this.subjectRepository.remove(subject);
  }
}
