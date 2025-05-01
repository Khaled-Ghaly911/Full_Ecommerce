import { Module } from '@nestjs/common';
import { OrderHistoryService } from './order-history.service';
import { OrderHistoryResolver } from './order-history.resolver';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderHistory } from './models/oderHistory';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([OrderHistory]),
    JwtModule
  ],
  providers: [OrderHistoryService, OrderHistoryResolver]
})
export class OrderHistoryModule {}
