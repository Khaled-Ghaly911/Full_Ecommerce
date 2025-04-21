import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { UserModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './models/cart';
import { CartItem } from './models/cart_item';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Cart, CartItem]),
    UserModule,
    ProductModule
  ],
  providers: [CartService]
})
export class CartModule {}
