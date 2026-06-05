import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { BookingService } from './booking.service';
import { Prisma } from '@prisma/client';

@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  create(@Body() data: any) {
    // Basic mapping for simple demo
    return this.bookingService.create({
      from: data.from,
      to: data.to,
      tripType: data.tripType,
      pickupDate: new Date(data.pickupDate),
      returnDate: data.returnDate ? new Date(data.returnDate) : null,
      pax: parseInt(data.pax),
      notes: data.notes,
      vehicle: { connect: { id: data.vehicleId } },
      user: data.userId ? { connect: { id: data.userId } } : undefined,
    });
  }

  @Get()
  findAll() {
    return this.bookingService.findAll();
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.bookingService.updateStatus(id, status);
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.bookingService.findByUser(userId);
  }
}
