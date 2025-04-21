export class CreateEmployeeDto {
    employee_code: string;
    employee_name: string;
}

export class UpdateEmployeeDto {
    employee_code?: string;
    employee_name?: string;
}