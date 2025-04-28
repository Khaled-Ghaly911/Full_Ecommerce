import { Module } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { WishlistResolver } from './wishlist.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WishList } from './models/wishlist';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[
    TypeOrmModule.forFeature([WishList]),
    JwtModule
  ],
  providers: [WishlistService, WishlistResolver]
})
export class WishlistModule {}


