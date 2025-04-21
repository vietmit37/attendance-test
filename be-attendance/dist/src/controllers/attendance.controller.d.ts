import { MonthlyAttendanceDto } from "@dtos/attendance.dto";
import { IAttendanceAndTotal, IAttendanceReport } from "@interfaces/attendance-and-total.interface";
import { ICustomResponse } from "@interfaces/custom-response.interface";
import { AttendanceService } from "@services/attendance.service";
import { Response } from "express";
export declare class AttendanceController {
    private readonly attendanceService;
    constructor(attendanceService: AttendanceService);
    findAll(): Promise<ICustomResponse<IAttendanceAndTotal>>;
    reportAttendance(query: MonthlyAttendanceDto): Promise<ICustomResponse<IAttendanceReport>>;
    exelReportAttendance(query: MonthlyAttendanceDto, res: Response): Promise<ICustomResponse>;
}
