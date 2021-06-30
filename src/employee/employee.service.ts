import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepo: Repository<Employee>,
  ) {}

  all(): Promise<Employee[]> {
    return this.employeeRepo.find({ relations: ['contactInfo'] });
  }

  get(id: number): Promise<Employee> {
    return this.employeeRepo.findOne(id, { relations: ['contactInfo'] });
  }

  create({ name }): Promise<Employee> {
    const newEmployee = this.employeeRepo.create({ name });
    return this.employeeRepo.save(newEmployee);
  }

  async assignManager(
    reporterId: number,
    managerId: number,
  ): Promise<Employee> {
    const reporter = await this.get(reporterId);
    const manager = await this.get(managerId);
    if (!reporter || !manager) {
      throw new NotFoundException();
    } else {
      reporter.manager = manager;
      return this.employeeRepo.save(reporter);
    }
  }
}
