import { Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { ReportsService } from 'src/reports/reports.service';
import { UserSubject } from 'src/jointable/user-subject.entity';
import { SubjectsService } from 'src/subjects/subjects.service';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private studentRepository: Repository<User>,
        @Inject(forwardRef(() => ReportsService))
        private reportsService: ReportsService,
        @InjectRepository(UserSubject)
        private readonly userSubjectRepository: Repository<UserSubject>,
        private readonly subjectRepository: SubjectsService
    ) { }

    findUserById(id: number) {
        return this.studentRepository.findOne({ where: { id } });
    }

    findUser(username: string) {
        return this.studentRepository.findOne({ where: { username } });
    }

    findAll() {
        return this.studentRepository.find();
    }

    createUser(user: CreateUserDto) {
        const newUser = this.studentRepository.create(user);
        return this.studentRepository.save(newUser);
    }

    async updateUser(id: number, attrs: Partial<User>) {
        const userUpdate = await this.findUserById(id);
        if (!userUpdate) {
            throw new NotFoundException('User not found !!!');
        }
        Object.assign(userUpdate, attrs);
        return this.studentRepository.save(userUpdate);
    }

    async deleteUser(id: number) {
        const userDelete = await this.findUserById(id);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const reports = await this.reportsService.updateReportsUserId(id);

        if (!userDelete) {
            throw new NotFoundException('User not found !!!');
        }
        return this.studentRepository.remove(userDelete);
    }

    async createUserSubject(userId:number, subjectId: number, score: number): Promise<UserSubject> {
        const userSubject = new UserSubject();
        userSubject.user = await this.findUserById(userId);
        userSubject.subject = await this.subjectRepository.findOne(subjectId);
        userSubject.score = score;
        const userSubjectRecord = this.userSubjectRepository.create(userSubject);
        return await this.userSubjectRepository.save(userSubjectRecord);
    }
}
