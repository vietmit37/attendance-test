import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Attendance } from './attendance.entity';

@Entity('employees')
export class Employee {
  @PrimaryGeneratedColumn()
  employee_id: number;

  @Column({ unique: true })
  employee_code: string;

  @Column()
  employee_name: string;

  @OneToMany(() => Attendance, (attendance) => attendance.employee)
  attendances: Attendance[];
}