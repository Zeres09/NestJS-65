import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookingModule } from './booking/booking.module';
import { Booking } from './booking/entity/booking.entity/booking';
import { Flight } from './booking/entity/booking.entity/flight';
import { Seat } from './booking/entity/booking.entity/seat';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './bookingdb/book.db',
      entities: [Booking, Flight, Seat],
      synchronize: true,
    }),
    BookingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
