import { Controller, Get } from "@nestjs/common";

@Controller("employee")
export class EmployeeController {
    constructor() { }

    @Get()
    async getEmployee() {
        return "Employee data will be returned here.";
    }
}