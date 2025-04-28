import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserModule } from './users/users.module';
import { User } from './users/models/user';
import { AuthModule } from './auth/auth.module';
import { Product } from './product/models/product';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { Category } from './category/models/category';
import { CartModule } from './cart/cart.module';
import { Cart } from './cart/models/cart';
import { CartItem } from './cart/models/cart_item';
import { StripeModule } from './stripe/stripe.module';
import { ShippingAddressModule } from './shipping-address/shipping-address.module';
import { ShippingAddress } from './shipping-address/models/address';
import { ReviewModule } from './review/review.module';
import { Review } from './review/models/review';
import { WishlistModule } from './wishlist/wishlist.module';
import { WishList } from './wishlist/models/wishlist';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.development`, `.env`]
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: `./schema.gql`,
      context: (({ req, res })=>({ req, res })),
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'postgres',
          host: config.get<string>('DB_HOST'),
          port: config.get<number>('DB_PORT'),
          username: config.get<string>('DB_USER'),
          password: String(config.get<string>('DB_PASSWORD')),
          database: config.get<string>('DB_NAME'),
          entities: [
            User, 
            Product, 
            Category, 
            Cart, 
            CartItem, 
            ShippingAddress,
            Review,
            WishList
          ],
          synchronize: true,
        }
      }
    }),
    UserModule,
    AuthModule,
    ProductModule,
    CategoryModule,
    CartModule,
    StripeModule,
    ShippingAddressModule,
    ReviewModule,
    WishlistModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
