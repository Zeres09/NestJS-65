import { IsString, IsNumber } from 'class-validator';
export class SeatDto {
  @IsNumber()
  s_id: number;

  @IsString()
  s_f_name: string;

  @IsString()
  s_remind: string;
}
