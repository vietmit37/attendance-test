import { MonthlyAttendanceDto } from "@dtos/attendance.dto";
import { IAttendanceAndTotal, IAttendanceReport } from "@interfaces/attendance-and-total.interface";
import { ICustomResponse } from "@interfaces/custom-response.interface";
import { Controller, Get, Query, Res } from "@nestjs/common";
import { AttendanceService } from "@services/attendance.service";
import { Response } from "express";

@Controller("attendance")
export class AttendanceController {
    constructor(
        private readonly attendanceService: AttendanceService
    ) {
    }

    @Get()
    async findAll(
    ): Promise<ICustomResponse<IAttendanceAndTotal>> {
        return {
            message: "Thanh cong",
            result: await this.attendanceService.findAll()
        }
    }

    @Get("report")
    async reportAttendance(
        @Query() query: MonthlyAttendanceDto
    ): Promise<ICustomResponse<IAttendanceReport>> {
        return {
            message: "Thanh cong",
            result: await this.attendanceService.reportAttendance(query)
        }
    }

    @Get("exel-report")
    async exelReportAttendance(
        @Query() query: MonthlyAttendanceDto,
        @Res() res: Response,
    ): Promise<ICustomResponse> {
        const file = await this.attendanceService.exelReportAttendance(query)
        res.setHeader(
            'Content-Type',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        );

        res.setHeader(
            'Content-Disposition',
            `attachment; filename=${file.sheetName}.xlsx`,
        );
        res.write(file.buffer, 'binary');
        res.end(null, 'binary');
        return {
            message: "Xuất file excel thành công",
            result: undefined
        }
    }
}
