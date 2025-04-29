import { Module } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { WishlistResolver } from './wishlist.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WishList } from './models/wishlist';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { ProductModule } from 'src/product/product.module';
import { UserModule } from 'src/users/users.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([WishList]),
    JwtModule,
    AuthModule,
    ProductModule,
    UserModule
  ],
  providers: [WishlistService, WishlistResolver]
})
export class WishlistModule {}


