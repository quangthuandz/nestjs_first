import { Controller, Get, Post, Body, Patch, Param, Delete, Headers } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ReportDto } from './dto/report.dto';
import { jwtConstants } from 'src/auth/constants';
import * as jwt from 'jsonwebtoken';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post('/create')
  @Serialize(ReportDto)
  create(@Body() createReportDto: CreateReportDto,@Headers('authorization') authorization: string) {
    const token = authorization.replace('Bearer ', '');
        console.log(token);
        const decodedToken = jwt.verify(token, jwtConstants.secret);
        const userId = decodedToken.sub as string;
        console.log('id '+ userId);
    return this.reportsService.create(createReportDto,parseInt(userId));
  }

  @Get()
  @Serialize(ReportDto)
  findAll() {
    return this.reportsService.findAll();
  }

  @Get('filter/:id')
  @Serialize(ReportDto)
  findByUserId(@Param('id') id:number) {
    return this.reportsService.findReportByUserId(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reportsService.findOne(+id);
  }

  @Patch('/update/:id')
  update(@Param('id') id: string, @Body() updateReportDto: UpdateReportDto) {
    return this.reportsService.update(+id, updateReportDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.reportsService.remove(+id);
  }
}
