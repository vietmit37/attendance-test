import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Employee } from './employee.entity';
import { Outlet } from './outlet.entity';

@Entity('attendances')
export class Attendance {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Employee, (employee) => employee.attendances)
    @JoinColumn({ name: 'employee_id' })
    employee: Employee;

    @ManyToOne(() => Outlet, (outlet) => outlet.attendances)
    @JoinColumn({ name: 'outlet_id' })
    outlet: Outlet;

    @Column({ type: 'date' })
    attendance_date: Date;

    @Column({
        type: 'enum',
        enum: ['CheckIn', 'CheckOut'],
    })
    attendance_type: 'CheckIn' | 'CheckOut';

    @Column({ type: 'time' })
    attendance_time: Date;
}