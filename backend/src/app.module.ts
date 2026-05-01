import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { BookingModule } from './booking/booking.module';
import { InquiryModule } from './inquiry/inquiry.module';

@Module({
  imports: [AuthModule, UserModule, VehicleModule, BookingModule, InquiryModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
