import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookDto } from 'src/booking/dto/booking.dto/book-dto';
import { FlightDto } from 'src/booking/dto/booking.dto/flight-dto';
import { SeatDto } from 'src/booking/dto/booking.dto/seat-dto';
import { Booking } from 'src/booking/entity/booking.entity/booking';
import { Flight } from 'src/booking/entity/booking.entity/flight';
import { Seat } from 'src/booking/entity/booking.entity/seat';
import { getManager, Repository } from 'typeorm';

@Injectable()
export class BookserviceService {
  ETManager = getManager();
  constructor(
    @InjectRepository(Flight)
    private flightrepository: Repository<Flight>,
    @InjectRepository(Seat)
    private seatrepository: Repository<Seat>,
    @InjectRepository(Booking)
    private bookrepository: Repository<Booking>,
  ) {}
  //--flight--//

  createFlight(flight: FlightDto): Promise<Flight> {
    return this.flightrepository.save(flight);
  }

  allFlight(): Promise<FlightDto[]> {
    return this.flightrepository.find();
  }

  async findFlight(
    from: string,
    to: string,
    departure: string,
  ): Promise<FlightDto> {
    return this.flightrepository.findOne({
      f_from: from,
      f_to: to,
      f_departure: departure,
    });
  }

  async editFlight(id: number): Promise<FlightDto> {
    return this.flightrepository.findOne({ f_id: id });
  }

  //-----------//

  //--seat--//

  createSeat(seat: SeatDto): Promise<Seat> {
    return this.seatrepository.save(seat);
  }

  allSeat(): Promise<SeatDto[]> {
    return this.seatrepository.find();
  }

  seatRemind(flight): Promise<SeatDto> {
    return this.ETManager.query(
      'SELECT s_f_name,s_remind FROM `seat` WHERE s_f_name = $1 ORDER BY s_remind ASC',
      [flight],
    );
  }

  checkSeat(f_name: string, remind: string): Promise<SeatDto> {
    return this.seatrepository.findOne({ s_f_name: f_name, s_remind: remind });
  }

  async removeSeatRemind(f_name, s_remind) {
    return this.ETManager.query(
      'DELETE FROM `seat` WHERE s_f_name= $1 AND s_remind= $2',
      [f_name, s_remind],
    );
  }
  //-----------//

  //--booking--//
  createBook(book: BookDto): Promise<BookDto> {
    return this.bookrepository.save(book);
  }
  getBooking(id: number): Promise<BookDto> {
    return this.bookrepository.findOne({ b_id: id });
  }
  async removeBooking(id: number): Promise<void> {
    this.bookrepository.delete(id);
  }

  async showOneDateBooking(departure: string): Promise<BookDto[]> {
    return this.bookrepository.find({ b_departure: departure });
  }
  //-----------//
}
