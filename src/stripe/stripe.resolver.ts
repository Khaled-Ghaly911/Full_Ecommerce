// src/payment/payment.resolver.ts
import { Resolver, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decoretors/current-user';
import { StripeService } from '../stripe/stripe.service';
import { CartService } from '../cart/cart.service';
import { User } from 'src/users/models/user';
import { AuthGuard } from 'src/guards/auth.guard';

@Resolver()
export class PaymentResolver {
  constructor(
    private readonly stripeService: StripeService,
    private readonly cartService: CartService,
  ) {}

  @Mutation(() => String)
  @UseGuards(AuthGuard)
  async checkout(@CurrentUser() user: User) {
    const cart = await this.cartService.getUserCart(user.id);

    const amount = cart.cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);

    const session = await this.stripeService.createCheckoutSession(
      amount,
      cart.id,
      user.email,
    );

    return session.url;
  }
}
