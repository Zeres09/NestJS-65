import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Flight {
  @PrimaryGeneratedColumn()
  f_id: number;

  @Column({ nullable: false })
  f_name: string;

  @Column({ nullable: false })
  f_from: string;

  @Column({ nullable: false })
  f_to: string;

  @Column({ nullable: false })
  f_departure: string;
}
