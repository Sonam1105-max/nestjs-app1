import { Controller, Post, Body, UseGuards, Patch, Param } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportDto } from './dtos/report.dto';
import { UserGuard } from '../users/guards/userGuard.guard';
import { CurrentUser } from 'src/users/decorators/currentUser.decorator';
import { UserDto } from 'src/users/dtos/user.dto';
import { User } from 'src/users/user.entity';
import { Serialize } from 'src/interceptors/getUser.interceptor';
import { ReportFormatDto } from './dtos/reportFormat.dto';
import { ApprovedReportDto } from './dtos/approveReport.dto';

@Controller('reports')
export class ReportsController {
    constructor(public reportservice: ReportsService ){}

    @Post()
    @UseGuards(UserGuard)
    @Serialize(ReportFormatDto)
    createReports(@Body() body:ReportDto, @CurrentUser() user:User){
        console.log("USer in create report: "+ user);
        return this.reportservice.createReports(body,user);
    }

    @Patch('/:id')
    approveReport(@Param('id') id:string, @Body() body:ApprovedReportDto){
        return this.reportservice.approveReport(id,body.approved);
    }
}
