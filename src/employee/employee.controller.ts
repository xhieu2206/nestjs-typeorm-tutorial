import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Employee } from './entities/employee.entity';

@Controller()
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @Get('/employees')
  async all(): Promise<Employee[]> {
    return this.employeeService.all();
  }

  @Get('/employees/:id')
  async get(@Param('id') id: number): Promise<Employee> {
    return this.employeeService.get(id);
  }

  @Post('/employees/manager')
  async assignManager(@Body() dto: any): Promise<Employee> {
    return this.employeeService.assignManager(dto.reporterId, dto.managerId);
  }

  @Post('/employees')
  async create(@Body() dto: any): Promise<Employee> {
    return this.employeeService.create(dto);
  }
}
