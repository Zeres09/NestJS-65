import { IsString, IsNumber } from 'class-validator';
export class BookDto {
  @IsNumber()
  b_id: number;

  @IsString()
  b_fullname: string;

  @IsString()
  b_from: string;

  @IsString()
  b_to: string;

  @IsString()
  b_departure: string;

  @IsString()
  b_flight: string;

  @IsString()
  b_seat: string;
}
