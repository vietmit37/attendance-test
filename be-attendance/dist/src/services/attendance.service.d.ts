import { MonthlyAttendanceDto } from "@dtos/attendance.dto";
import { Attendance } from "@entities/attendance.entity";
import { IAttendanceReport } from "@interfaces/attendance-and-total.interface";
import { DataSource, Repository } from "typeorm";
export declare function getDaysInMonth(month: number, year: number): number;
export declare function generateMonthlyReport(month: number, year: number): {
    days: {
        [key: string]: number;
    };
};
export declare class AttendanceService {
    private readonly attendanceRepository;
    private readonly dataSource;
    static CELL_HEIGHT: number;
    static CELL_WIDTH: number;
    static DATE_FORMAT: string;
    constructor(attendanceRepository: Repository<Attendance>, dataSource: DataSource);
    findAll(): Promise<{
        attendance: Attendance[];
        total: number;
    }>;
    reportAttendance(query: MonthlyAttendanceDto): Promise<IAttendanceReport>;
    exelReportAttendance(query: MonthlyAttendanceDto): Promise<{
        buffer: Buffer;
        sheetName: string;
    }>;
}
