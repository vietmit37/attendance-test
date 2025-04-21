import { Employee } from "@entities/employee.entity";
import { Repository } from "typeorm";
export declare class EmployeeService {
    private readonly employeeRepository;
    constructor(employeeRepository: Repository<Employee>);
    getEmployee(): Promise<string>;
}
