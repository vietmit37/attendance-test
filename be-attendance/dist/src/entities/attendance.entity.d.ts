import { Employee } from './employee.entity';
import { Outlet } from './outlet.entity';
export declare class Attendance {
    id: number;
    employee: Employee;
    outlet: Outlet;
    attendance_date: Date;
    attendance_type: 'CheckIn' | 'CheckOut';
    attendance_time: Date;
}
