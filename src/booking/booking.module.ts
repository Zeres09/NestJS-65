import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookcontrollerController } from './controller/bookcontroller/bookcontroller.controller';
import { Booking } from './entity/booking.entity/booking';
import { Flight } from './entity/booking.entity/flight';
import { Seat } from './entity/booking.entity/seat';
import { BookserviceService } from './service/bookservice/bookservice.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Booking]),
    TypeOrmModule.forFeature([Seat]),
    TypeOrmModule.forFeature([Flight]),
  ],
  controllers: [BookcontrollerController],
  providers: [BookserviceService],
})
export class BookingModule {}
