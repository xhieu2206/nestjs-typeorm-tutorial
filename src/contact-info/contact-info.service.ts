import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContactInfo } from './entities/contact-info.entity';
import { Repository } from 'typeorm';
import { EmployeeService } from '../employee/employee.service';

@Injectable()
export class ContactInfoService {
  constructor(
    @InjectRepository(ContactInfo)
    private readonly contactInfoRepo: Repository<ContactInfo>,
    private employeeService: EmployeeService,
  ) {}

  async create(employeeId: number, { phone, email }): Promise<ContactInfo> {
    const employee = await this.employeeService.get(employeeId);
    if (employee) {
      const newContactInfo = this.contactInfoRepo.create({
        phone,
        email,
        employee: employee,
      });
      return this.contactInfoRepo.save(newContactInfo);
    } else {
      throw new NotFoundException();
    }
  }
}
