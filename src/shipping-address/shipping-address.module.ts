import { Module } from '@nestjs/common';
import { ShippingAddressService } from './shipping-address.service';
import { ShippingAddressResolver } from './shipping-address.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShippingAddress } from './models/address';
import { UserModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ShippingAddress]),
    UserModule,
    AuthModule
  ],
  providers: [ShippingAddressService, ShippingAddressResolver],
  exports: [ShippingAddressService, ShippingAddressResolver]
})
export class ShippingAddressModule {}
