import { Module, NotFoundException } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StripeService } from './stripe.service';
import Stripe from 'stripe';
import { PaymentResolver } from './stripe.resolver';
import { CartModule } from 'src/cart/cart.module';
import { ProductModule } from 'src/product/product.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    ConfigModule,
    CartModule,
    ProductModule,
    AuthModule
  ],
  providers: [
    StripeService,
    {
      provide: 'STRIPE_INSTANCE',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const stripeKey = configService.get<string>('STRIPE_SECRET_KEY');
        if (!stripeKey) {
          throw new NotFoundException('Stripe key not found');
        }

        return new Stripe(stripeKey, {
          apiVersion: '2025-03-31.basil',
        });
      },
    },
    PaymentResolver
  ],
  exports: [StripeService,PaymentResolver],
})
export class StripeModule {}
