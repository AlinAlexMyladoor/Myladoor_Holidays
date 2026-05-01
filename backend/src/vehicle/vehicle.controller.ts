import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { Prisma } from '@prisma/client';

@Controller('vehicles')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Get()
  findAll() {
    return this.vehicleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vehicleService.findOne(id);
  }

  @Post()
  create(@Body() data: Prisma.VehicleCreateInput) {
    return this.vehicleService.create(data);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Prisma.VehicleUpdateInput) {
    return this.vehicleService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vehicleService.remove(id);
  }
}
