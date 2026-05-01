import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Inquiry, Prisma } from '@prisma/client';

@Injectable()
export class InquiryService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.InquiryCreateInput) {
    return this.prisma.inquiry.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.inquiry.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async markAsRead(id: string) {
    return this.prisma.inquiry.update({
      where: { id },
      data: { read: true },
    });
  }
}
