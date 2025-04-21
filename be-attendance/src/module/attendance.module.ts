import { AttendanceController } from "@controllers/attendance.controller";
import { Attendance } from "@entities/attendance.entity";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AttendanceService } from "@services/attendance.service";
import { Type } from "class-transformer";

@Module({
    imports: [
        TypeOrmModule.forFeature([Attendance]),
    ],
    controllers: [
        AttendanceController
    ],
    providers: [
        AttendanceService
    ],
    exports: [],
})
export class AttendanceModule { }