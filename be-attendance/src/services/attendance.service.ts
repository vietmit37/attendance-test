import { MonthlyAttendanceDto } from "@dtos/attendance.dto";
import { Attendance } from "@entities/attendance.entity";
import { IAttendanceReport } from "@interfaces/attendance-and-total.interface";
import {Injectable, Logger} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import ExcelJS from 'exceljs';
import { format } from 'date-fns';
import { console } from "inspector";


const daysOfMonth = Array.from({ length: 31 }, (_, i) => i + 1);
const month = {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "May",
    6: "Jun",
    7: "Jul",
    8: "Aug",
    9: "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec",
}

export function getDaysInMonth(month: number, year: number): number {
    return new Date(year, month, 0).getDate();
}

export function generateMonthlyReport(month: number, year: number) {
    const daysInMonth = getDaysInMonth(month, year);
    const days: { [key: string]: number } = {};

    // Initialize all days with 0 hours
    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        days[dateStr] = 0;
    }
    // Fill in actual work hours
    return {
        days,
    };
}
@Injectable()
export class AttendanceService {
    public static CELL_HEIGHT = 30;
    public static CELL_WIDTH = 20;
    static DATE_FORMAT = 'dd-MM-yyyy-hh-mm-ss';

    constructor(
        @InjectRepository(Attendance)
        private readonly attendanceRepository: Repository<Attendance>,
        private readonly dataSource: DataSource,

    ) { }


    async findAll() {
        const [attendance, total] = await this.attendanceRepository.findAndCount({
            relations: ["employee"],
            order: {
                id: "DESC",
            },
        })
        return {
            attendance, total
        }
    }
    async reportAttendance(
        query: MonthlyAttendanceDto
    ): Promise<IAttendanceReport> {
        const sql = 'SELECT * FROM calculate_employee_work_hours_monthly($1, $2);';
        const results = await this.dataSource.query(sql, [query.year, query.month]);
        return results
    }

    async exelReportAttendance(
        query: MonthlyAttendanceDto
    ): Promise<{ buffer: Buffer, sheetName: string }> {
        const sql = 'SELECT * FROM calculate_employee_work_hours_monthly($1, $2);';
        const results = await this.dataSource.query(sql, [query.year, query.month]);
        const generateDayIsMonthly = generateMonthlyReport(query.month, query.year);

        const formatteReport: Array<{
            [key: string]: string;
        }> = results.map((result, index) => {
            const output = {};

            output["STT"] = index + 1;
            output["Mã nhân viên"] = result.ma_nhan_vien;
            output["Tên nhân viên"] = result.ten_nhan_vien;
            output["Mã cửa hàng"] = result.ma_cua_hang || null;
            output["Tên cửa hàng"] = result.ten_cua_hang || null
            // Object.keys(generateDayIsMonthly.days).forEach((day) => {
            //     const dayKey = `day_${day.split("-")[2]}`;
            //     const formattedDayMonth = `${month[Number(day.split("-")[1])]}-${day.split("-")[2]}`;
            //     output[`${formattedDayMonth}`] = result[dayKey] || null;
            // })
            daysOfMonth.forEach((day) => {
                const dayKey = `day_${day}`;
                const formattedDayMonth = `${month[query.month]}-${String(day).padStart(2, '0')}`;
                output[`${formattedDayMonth}`] = result[dayKey] || null;
            })
            return {
                ...output
            };
        });

        const workbook = new ExcelJS.Workbook();
        const sheetName = `bao-cao-cham-cong-${Object.keys(generateDayIsMonthly.days)[0].split("-")[1]}-${Object.keys(generateDayIsMonthly.days)[0].split("-")[0]}-${format(new Date(), AttendanceService.DATE_FORMAT)}`;
        const offset = 0;
        const worksheet = workbook.addWorksheet(sheetName);

        // Set the default column width
        const border: Partial<ExcelJS.Borders> = {
            top: {
                color: { argb: 'FF000000' },
                style: 'thin',
            },
            bottom: {
                color: { argb: 'FF000000' },
                style: 'thin',
            },
            left: {
                color: { argb: 'FF000000' },
                style: 'thin',
            },
            right: {
                color: { argb: 'FF000000' },
                style: 'thin',
            },
        };
        const alignmentCell: Partial<ExcelJS.Alignment> = {
            wrapText: true,
            horizontal: 'center',
            vertical: 'middle',
        };

        const tableRows = formatteReport.length;
        const tableColumns = Object.keys(formatteReport[0]).length;
        // Set the default row height
        Array(tableRows)
            .fill(0)
            .forEach((_, index) => {
                worksheet.getRow(index + offset + tableRows).height =
                    AttendanceService.CELL_HEIGHT;
                worksheet.getRow(index + offset + tableRows).alignment = alignmentCell;
                worksheet.getRow(index + offset + tableRows).eachCell((cell) => {
                    cell.border = border;
                });
            });
        // Set the default column width
        Array(tableColumns)
            .fill(0)
            .forEach((_, index) => {
                worksheet.getColumn(index + 2).width = AttendanceService.CELL_WIDTH;
            });

        // Generate column names (A, B, C...)
        const alpha = Array.from(Array(26)).map((e, i) => i + 65);
        const alphabet = alpha.map((x) => String.fromCharCode(x));
        const columnNames = Array(tableColumns)
            .fill(0)
            .map((_, index) => {
                if (index < 26) {
                    return alphabet[index];
                }

                return (
                    alphabet[(index - (index % 26)) / 26 - 1] +
                    alphabet[(index - 26) % 26]
                );
            });

        // Set the header row
        const keys = Object.keys(formatteReport[0]);
        // Set the header row with bold font and borders
        columnNames.forEach((columnName, index) => {
            worksheet.getCell(`${columnName}${offset + 1} `).font = {
                bold: true,
            };

            worksheet.getCell(`${columnName}${offset + 1} `).value = keys[index];

            worksheet.getCell(`${columnName}${offset + 1} `).border = border;
        });
        // Set the header row height
        for (let i = 0; i < tableRows; i += 1) {
            worksheet.getRow(i + offset + 1).height = AttendanceService.CELL_HEIGHT;
            worksheet.getRow(i + offset + 1).alignment = alignmentCell;

            columnNames.forEach((columnName, index) => {
                worksheet.getCell(`${columnName}${i + offset + 2} `).border = border;
                worksheet.getCell(`${columnName}${i + offset + 2} `).value =
                    formatteReport[i][keys[index]];
            });
        }
            daysOfMonth.forEach((day) => {
                const dayKey = `day_${String(day).padStart(2, '0')}`;
                Logger.log(dayKey);
            })

        return {
            buffer: (await workbook.xlsx.writeBuffer()) as unknown as Buffer,
            sheetName,
        };
    }
}
