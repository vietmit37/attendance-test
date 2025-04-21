"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var AttendanceService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceService = void 0;
exports.getDaysInMonth = getDaysInMonth;
exports.generateMonthlyReport = generateMonthlyReport;
const attendance_entity_1 = require("../entities/attendance.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const exceljs_1 = __importDefault(require("exceljs"));
const date_fns_1 = require("date-fns");
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
};
function getDaysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}
function generateMonthlyReport(month, year) {
    const daysInMonth = getDaysInMonth(month, year);
    const days = {};
    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        days[dateStr] = 0;
    }
    return {
        days,
    };
}
let AttendanceService = class AttendanceService {
    static { AttendanceService_1 = this; }
    attendanceRepository;
    dataSource;
    static CELL_HEIGHT = 30;
    static CELL_WIDTH = 20;
    static DATE_FORMAT = 'dd-MM-yyyy-hh-mm-ss';
    constructor(attendanceRepository, dataSource) {
        this.attendanceRepository = attendanceRepository;
        this.dataSource = dataSource;
    }
    async findAll() {
        const [attendance, total] = await this.attendanceRepository.findAndCount({
            relations: ["employee"],
            order: {
                id: "DESC",
            },
        });
        return {
            attendance, total
        };
    }
    async reportAttendance(query) {
        const sql = 'SELECT * FROM calculate_employee_work_hours_monthly($1, $2);';
        const results = await this.dataSource.query(sql, [query.year, query.month]);
        return results;
    }
    async exelReportAttendance(query) {
        const sql = 'SELECT * FROM calculate_employee_work_hours_monthly($1, $2);';
        const results = await this.dataSource.query(sql, [query.year, query.month]);
        const generateDayIsMonthly = generateMonthlyReport(query.month, query.year);
        const formatteReport = results.map((result, index) => {
            const output = {};
            output["STT"] = index + 1;
            output["Mã nhân viên"] = result.ma_nhan_vien;
            output["Tên nhân viên"] = result.ten_nhan_vien;
            output["Mã cửa hàng"] = result.ma_cua_hang || null;
            output["Tên cửa hàng"] = result.ten_cua_hang || null;
            daysOfMonth.forEach((day) => {
                const dayKey = `day_${day}`;
                const formattedDayMonth = `${month[query.month]}-${String(day).padStart(2, '0')}`;
                output[`${formattedDayMonth}`] = result[dayKey] || null;
            });
            return {
                ...output
            };
        });
        const workbook = new exceljs_1.default.Workbook();
        const sheetName = `bao-cao-cham-cong-${Object.keys(generateDayIsMonthly.days)[0].split("-")[1]}-${Object.keys(generateDayIsMonthly.days)[0].split("-")[0]}-${(0, date_fns_1.format)(new Date(), AttendanceService_1.DATE_FORMAT)}`;
        const offset = 0;
        const worksheet = workbook.addWorksheet(sheetName);
        const border = {
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
        const alignmentCell = {
            wrapText: true,
            horizontal: 'center',
            vertical: 'middle',
        };
        const tableRows = formatteReport.length;
        const tableColumns = Object.keys(formatteReport[0]).length;
        Array(tableRows)
            .fill(0)
            .forEach((_, index) => {
            worksheet.getRow(index + offset + tableRows).height =
                AttendanceService_1.CELL_HEIGHT;
            worksheet.getRow(index + offset + tableRows).alignment = alignmentCell;
            worksheet.getRow(index + offset + tableRows).eachCell((cell) => {
                cell.border = border;
            });
        });
        Array(tableColumns)
            .fill(0)
            .forEach((_, index) => {
            worksheet.getColumn(index + 2).width = AttendanceService_1.CELL_WIDTH;
        });
        const alpha = Array.from(Array(26)).map((e, i) => i + 65);
        const alphabet = alpha.map((x) => String.fromCharCode(x));
        const columnNames = Array(tableColumns)
            .fill(0)
            .map((_, index) => {
            if (index < 26) {
                return alphabet[index];
            }
            return (alphabet[(index - (index % 26)) / 26 - 1] +
                alphabet[(index - 26) % 26]);
        });
        const keys = Object.keys(formatteReport[0]);
        columnNames.forEach((columnName, index) => {
            worksheet.getCell(`${columnName}${offset + 1} `).font = {
                bold: true,
            };
            worksheet.getCell(`${columnName}${offset + 1} `).value = keys[index];
            worksheet.getCell(`${columnName}${offset + 1} `).border = border;
        });
        for (let i = 0; i < tableRows; i += 1) {
            worksheet.getRow(i + offset + 1).height = AttendanceService_1.CELL_HEIGHT;
            worksheet.getRow(i + offset + 1).alignment = alignmentCell;
            columnNames.forEach((columnName, index) => {
                worksheet.getCell(`${columnName}${i + offset + 2} `).border = border;
                worksheet.getCell(`${columnName}${i + offset + 2} `).value =
                    formatteReport[i][keys[index]];
            });
        }
        daysOfMonth.forEach((day) => {
            const dayKey = `day_${String(day).padStart(2, '0')}`;
            common_1.Logger.log(dayKey);
        });
        return {
            buffer: (await workbook.xlsx.writeBuffer()),
            sheetName,
        };
    }
};
exports.AttendanceService = AttendanceService;
exports.AttendanceService = AttendanceService = AttendanceService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(attendance_entity_1.Attendance)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.DataSource])
], AttendanceService);
//# sourceMappingURL=attendance.service.js.map