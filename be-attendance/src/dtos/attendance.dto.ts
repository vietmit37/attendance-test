import { IsInt, Max, Min } from "class-validator";

export class CreateAttendanceDto {
  employee_id: number;
  outlet_id: number;
  attendance_date: Date;
  attendance_type: 'CheckIn' | 'CheckOut';
  attendance_time: Date;
}

export class UpdateAttendanceDto {
  employee_id?: number;
  outlet_id?: number;
  attendance_date?: Date;
  attendance_type?: 'CheckIn' | 'CheckOut';
  attendance_time?: Date;
}

export class MonthlyAttendanceDto {
  @IsInt()
  @Min(1900)
  @Max(2100)
  year: number;

  @IsInt()
  @Min(1)
  @Max(12)
  month: number;

}