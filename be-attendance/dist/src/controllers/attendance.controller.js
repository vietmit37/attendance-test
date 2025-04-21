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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceController = void 0;
const attendance_dto_1 = require("../dtos/attendance.dto");
const common_1 = require("@nestjs/common");
const attendance_service_1 = require("../services/attendance.service");
let AttendanceController = class AttendanceController {
    attendanceService;
    constructor(attendanceService) {
        this.attendanceService = attendanceService;
    }
    async findAll() {
        return {
            message: "Thanh cong",
            result: await this.attendanceService.findAll()
        };
    }
    async reportAttendance(query) {
        return {
            message: "Thanh cong",
            result: await this.attendanceService.reportAttendance(query)
        };
    }
    async exelReportAttendance(query, res) {
        const file = await this.attendanceService.exelReportAttendance(query);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename=${file.sheetName}.xlsx`);
        res.write(file.buffer, 'binary');
        res.end(null, 'binary');
        return {
            message: "Xuất file excel thành công",
            result: undefined
        };
    }
};
exports.AttendanceController = AttendanceController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)("report"),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [attendance_dto_1.MonthlyAttendanceDto]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "reportAttendance", null);
__decorate([
    (0, common_1.Get)("exel-report"),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [attendance_dto_1.MonthlyAttendanceDto, Object]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "exelReportAttendance", null);
exports.AttendanceController = AttendanceController = __decorate([
    (0, common_1.Controller)("attendance"),
    __metadata("design:paramtypes", [attendance_service_1.AttendanceService])
], AttendanceController);
//# sourceMappingURL=attendance.controller.js.map