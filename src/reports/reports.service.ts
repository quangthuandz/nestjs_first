import { Injectable, NotFoundException, forwardRef,Inject } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './report.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ReportsService {

  constructor(
    @InjectRepository(Report) private reportRepository: Repository<Report>,
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService
  ) { }

  async create(createReportDto: CreateReportDto, userId: number) {
    const user = await this.usersService.findUserById(userId);
    const report = this.reportRepository.create(createReportDto);
    report.user = user;
    return this.reportRepository.save(report);
  }

  findAll() {
    return this.reportRepository.find();
  }

  async findReportByUserId(id: number){
    
    const reports =  this.reportRepository.createQueryBuilder('report')
      .where('report.userId = :id', { id })
      .getMany();
    
    if((await reports).length==0){
      return "User has no reports"
    }
    return reports;
  }
  

  findOne(id: number) {
    return this.reportRepository.findOne({ where: { id } });
  }

  async updateReportsUserId(userId: number) {
    await this.reportRepository
      .createQueryBuilder()
      .update(Report)
      .set({ user : null }) // Sử dụng dấu nháy đơn để bao quanh tên cột
      .where('userId = :id', { id: userId }) // Đổi tên tham số để tránh xung đột
      .execute();
  }
  
  

  async update(id: number, attrs: Partial<Report>) {
    const report = await this.findOne(id);
    if (!report) {
      throw new NotFoundException('Report not found !!!');
    }
    Object.assign(report,attrs);
    return this.reportRepository.save(report);
  }

  async remove(id: number) {
    const report = await this.findOne(id);
    if (!report) {
      throw new NotFoundException('Report not found !!!. Input valid id');
    }
    return this.reportRepository.remove(report);
  }
}
