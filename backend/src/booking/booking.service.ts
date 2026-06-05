import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Booking, Prisma } from '@prisma/client';

@Injectable()
export class BookingService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.BookingCreateInput) {
    return this.prisma.booking.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.booking.findMany({
      include: {
        vehicle: true,
        user: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateStatus(id: string, status: any) {
    return this.prisma.booking.update({
      where: { id },
      data: { status },
    });
  }

  async findByUser(userId: string) {
    return this.prisma.booking.findMany({
      where: { userId },
      include: {
        vehicle: true,
        user: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
