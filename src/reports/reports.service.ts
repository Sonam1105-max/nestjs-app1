import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Report } from './reports.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ReportDto } from './dtos/report.dto';
import { UserDto } from 'src/users/dtos/user.dto';
import { User } from 'src/users/user.entity';

@Injectable()
export class ReportsService {
    constructor(@InjectRepository(Report) private reportRepository: Repository<Report>){}
    createReports(report: ReportDto, user: User){
        const result = this.reportRepository.create(report);
        result.user = user;
        return this.reportRepository.save(result);
    }
     async approveReport(id:string, approved:boolean){
        const report = await this.reportRepository.findOne({where:{id:parseInt(id)}});
        if(!report){
            throw new NotFoundException('Report not found');
        }
        report.approved = approved;
        this.reportRepository.save(report);
    }
}
