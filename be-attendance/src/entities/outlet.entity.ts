import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Attendance } from './attendance.entity';

@Entity('outlets')
export class Outlet {
  @PrimaryGeneratedColumn()
  outlet_id: number;

  @Column({ unique: true })
  outlet_code: string;

  @Column()
  outlet_name: string;

  @OneToMany(() => Attendance, (attendance) => attendance.outlet)
  attendances: Attendance[];
}