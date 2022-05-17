import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  b_id: number;

  @Column({ nullable: false })
  b_fullname: string;

  @Column({ nullable: false })
  b_from: string;

  @Column({ nullable: false })
  b_to: string;

  @Column({ nullable: false })
  b_departure: string;

  @Column({ nullable: false })
  b_flight: string;

  @Column({ nullable: false })
  b_seat: string;
}
