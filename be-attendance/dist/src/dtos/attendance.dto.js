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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonthlyAttendanceDto = exports.UpdateAttendanceDto = exports.CreateAttendanceDto = void 0;
const class_validator_1 = require("class-validator");
class CreateAttendanceDto {
    employee_id;
    outlet_id;
    attendance_date;
    attendance_type;
    attendance_time;
}
exports.CreateAttendanceDto = CreateAttendanceDto;
class UpdateAttendanceDto {
    employee_id;
    outlet_id;
    attendance_date;
    attendance_type;
    attendance_time;
}
exports.UpdateAttendanceDto = UpdateAttendanceDto;
class MonthlyAttendanceDto {
    year;
    month;
}
exports.MonthlyAttendanceDto = MonthlyAttendanceDto;
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1900),
    (0, class_validator_1.Max)(2100),
    __metadata("design:type", Number)
], MonthlyAttendanceDto.prototype, "year", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(12),
    __metadata("design:type", Number)
], MonthlyAttendanceDto.prototype, "month", void 0);
//# sourceMappingURL=attendance.dto.js.map