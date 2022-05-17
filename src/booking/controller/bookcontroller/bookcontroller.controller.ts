import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BookDto } from 'src/booking/dto/booking.dto/book-dto';
import { SeatDto } from 'src/booking/dto/booking.dto/seat-dto';
import { FlightDto } from 'src/booking/dto/booking.dto/flight-dto';
import { BookserviceService } from 'src/booking/service/bookservice/bookservice.service';

@Controller('bookcontroller')
export class BookcontrollerController {
  constructor(private bookService: BookserviceService) {}

  //--flight--//

  @Post('AddF')
  createFlight(@Body() newFlight: FlightDto): Promise<FlightDto> {
    const a1 = ['A', 'B', 'C'];
    const a2 = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'];
    for (let i = 0; i < a1.length; i++) {
      for (let j = 0; j < a2.length; j++) {
        const newSeat = new SeatDto();
        newSeat.s_f_name = newFlight.f_name;
        newSeat.s_remind = a1[i] + a2[j];
        this.bookService.createSeat(newSeat);
      }
    }
    return this.bookService.createFlight(newFlight);
  }

  @Put('UpdateF/:id/:f_from/:f_to/:f_departure')
  async updateflight(
    @Param('id') id: number,
    @Param('f_from') f_from: string,
    @Param('f_to') f_to: string,
    @Param('f_departure') f_departure: string,
    @Body() fdto: FlightDto,
  ): Promise<FlightDto> {
    const newFlight = await this.bookService.editFlight(id);
    fdto.f_from = f_from;
    fdto.f_to = f_to;
    fdto.f_departure = f_departure;
    newFlight.f_from = fdto.f_from;
    newFlight.f_to = fdto.f_to;
    newFlight.f_departure = fdto.f_departure;
    return await this.bookService.createFlight(newFlight);
  }

  @Get('AllF')
  async AllFlight(): Promise<FlightDto[]> {
    return this.bookService.allFlight();
  }
  //----------//

  //--seat--//
  @Get('AllS')
  async AllSeat(): Promise<SeatDto[]> {
    return this.bookService.allSeat();
  }
  @Get('LoadSeatremind/:flight')
  async LoadSeatremind(@Param('flight') flight: string): Promise<SeatDto> {
    return this.bookService.seatRemind(flight);
  }
  //----------//

  //--booking--//
  @Post('Booking')
  async createBook(@Body() newBook: BookDto): Promise<BookDto> {
    const checkFlight = await this.bookService.findFlight(
      newBook.b_from,
      newBook.b_to,
      newBook.b_departure,
    );
    if (checkFlight != null) {
      console.log(checkFlight);
      newBook.b_flight = checkFlight.f_name;
      const checkSeat = await this.bookService.checkSeat(
        newBook.b_flight,
        newBook.b_seat,
      );
      console.log(checkSeat);
      if (checkSeat != null) {
        this.bookService.removeSeatRemind(newBook.b_flight, newBook.b_seat);
        return this.bookService.createBook(newBook);
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  @Get('showOneDateBooking/:departure')
  async showOneDateBooking(
    @Param('departure') departure: string,
  ): Promise<BookDto[]> {
    return this.bookService.showOneDateBooking(departure);
  }

  @Delete('cancelBook/:id')
  async cancelBook(
    @Param('id') id: number,
    @Body() cancelSeat: SeatDto,
  ): Promise<any> {
    const cancelBook = await this.bookService.getBooking(id);
    cancelSeat.s_f_name = cancelBook.b_flight;
    cancelSeat.s_remind = cancelBook.b_seat;
    this.bookService.createSeat(cancelSeat);
    return await this.bookService.removeBooking(id);
  }

  @Put('updateBook/:id/:b_from/:b_to/:b_departure')
  async editBook(
    @Param('id') id: number,
    @Param('b_from') b_from: string,
    @Param('b_to') b_to: string,
    @Param('b_departure') b_departure: string,
    @Body() cancelSeat: SeatDto,
  ): Promise<BookDto> {
    const oldBook = await this.bookService.getBooking(id);
    const checkFlight = await this.bookService.findFlight(
      b_from,
      b_to,
      b_departure,
    );
    if (checkFlight != null) {
      console.log(oldBook);
      console.log(checkFlight);
      cancelSeat.s_remind = oldBook.b_seat;
      cancelSeat.s_f_name = oldBook.b_flight;
      oldBook.b_flight = checkFlight.f_name;
      console.log(oldBook);
      const checkSeat = await this.bookService.checkSeat(
        oldBook.b_flight,
        oldBook.b_seat,
      );
      console.log(checkSeat);
      if (checkSeat != null) {
        oldBook.b_from = checkFlight.f_from;
        oldBook.b_to = checkFlight.f_to;
        oldBook.b_departure = checkFlight.f_departure;
        this.bookService.createSeat(cancelSeat);
        this.bookService.removeSeatRemind(oldBook.b_flight, oldBook.b_seat);
        return await this.bookService.createBook(oldBook);
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  //----------//
}
