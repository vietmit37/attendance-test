export declare class CreateAttendanceDto {
    employee_id: number;
    outlet_id: number;
    attendance_date: Date;
    attendance_type: 'CheckIn' | 'CheckOut';
    attendance_time: Date;
}
export declare class UpdateAttendanceDto {
    employee_id?: number;
    outlet_id?: number;
    attendance_date?: Date;
    attendance_type?: 'CheckIn' | 'CheckOut';
    attendance_time?: Date;
}
export declare class MonthlyAttendanceDto {
    year: number;
    month: number;
}
