import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeModule } from './employee/employee.module';
import { ContactInfoModule } from './contact-info/contact-info.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database',
      entities: ['dist/**/*.entity.js'],
      synchronize: true,
      logging: true,
    }),
    EmployeeModule,
    ContactInfoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
