import { IsString, IsNumber } from 'class-validator';
export class FlightDto {
  @IsNumber()
  f_id: number;

  @IsString()
  f_name: string;

  @IsString()
  f_from: string;

  @IsString()
  f_to: string;

  @IsString()
  f_departure: string;
}
