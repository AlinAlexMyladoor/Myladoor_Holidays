import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { InquiryService } from './inquiry.service';
import { Prisma } from '@prisma/client';

@Controller('inquiries')
export class InquiryController {
  constructor(private readonly inquiryService: InquiryService) {}

  @Post()
  create(@Body() data: Prisma.InquiryCreateInput) {
    return this.inquiryService.create(data);
  }

  @Get()
  findAll() {
    return this.inquiryService.findAll();
  }

  @Patch(':id/read')
  markAsRead(@Param('id') id: string) {
    return this.inquiryService.markAsRead(id);
  }
}
