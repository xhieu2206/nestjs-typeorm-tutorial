import { Body, Controller, Param, Post } from '@nestjs/common';
import { ContactInfoService } from './contact-info.service';
import { ContactInfo } from './entities/contact-info.entity';

@Controller()
export class ContactInfoController {
  constructor(private contactInfoService: ContactInfoService) {}

  @Post('/employees/:employeeId/contact-info')
  create(
    @Body() dto: any,
    @Param('employeeId') employeeId: number,
  ): Promise<ContactInfo> {
    return this.contactInfoService.create(employeeId, { ...dto });
  }
}
