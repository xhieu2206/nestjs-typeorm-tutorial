import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinTable,
  JoinColumn,
} from 'typeorm';
import { ContactInfo } from '../../contact-info/entities/contact-info.entity';
import { Task } from '../../task/entities/task.entity';
import { Meeting } from '../../meeting/entities/meeting.entity';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Employee, (employee) => employee.directReports, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'manager_id' })
  manager: Employee;

  @OneToMany(() => Employee, (employee) => employee.manager)
  directReports: Employee[];

  @OneToOne(() => ContactInfo, (contactInfo) => contactInfo.employee)
  contactInfo: ContactInfo;

  @OneToMany(() => Task, (task) => task.employee)
  tasks: Task[];

  @ManyToMany(() => Meeting, (meeting) => meeting.attendees)
  @JoinTable({
    name: 'employees_meetings',
    joinColumn: {
      name: 'attendee_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'meeting_id',
      referencedColumnName: 'id',
    },
  })
  meetings: Meeting[];
}
