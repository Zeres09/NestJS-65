import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Seat {
  @PrimaryGeneratedColumn()
  s_id: number;

  @Column({ nullable: false })
  s_f_name: string;

  @Column({ nullable: false })
  s_remind: string;
}
