import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class NonWorkingDays {
  @PrimaryGeneratedColumn()
  id: number;

  //первый нерабочий день
  @Column({ type: 'timestamp', nullable: true })
  firstDay: Date;

  //количество дней
  @Column()
  numOfDays: number;

}
