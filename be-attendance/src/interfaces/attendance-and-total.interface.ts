import { Attendance } from "@entities/attendance.entity";

export interface IAttendanceAndTotal {
    attendance: Attendance[];
    total: number;
}

export interface IAttendanceReport {
    ma_nhan_vien: string;
    ten_nhan_vien: string;
    ma_cua_hang: string | null;
    ten_cua_hang: string | null;
    total_hours: string | null;
    [key: string]: string | null | number;
}