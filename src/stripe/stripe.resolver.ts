import { Resolver, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decoretors/current-user';
import { StripeService } from '../stripe/stripe.service';
import { CartService } from '../cart/cart.service';
import { User } from 'src/users/models/user';
import { AuthGuard } from 'src/guards/auth.guard';
import { ProductService } from 'src/product/product.service';

@Resolver(() => String)
export class PaymentResolver {
  constructor(
    private readonly stripeService: StripeService,
    private readonly cartService: CartService,
    private readonly productService: ProductService
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

    const cartItemsUpdated = cart.cartItems.map(async (item) => {
        const updatedData = await this.productService.decreaseStock(item.product.id, item.quantity);
    })

    await this.cartService.clearCart(cart.id);
    console.log('checkout Done');
    return session.url;
  }
}
