import { Attendance } from './attendance.entity';
export declare class Employee {
    employee_id: number;
    employee_code: string;
    employee_name: string;
    attendances: Attendance[];
}
