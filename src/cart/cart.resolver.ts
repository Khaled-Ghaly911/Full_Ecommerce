import { Resolver, Query, Mutation } from "@nestjs/graphql";
import { CartService } from "./cart.service";
import { Cart } from "./models/cart";

@Resolver(() => Cart)
export class CartResolver {
    constructor(
        private cartService: CartService
    ) {}

    @Query(() => Cart)
    async getUserCart(userId: number): Promise<Cart> {
        return this.cartService.getUserCart(userId);
    }

    @Mutation(() => Cart)
    async addItemToCart(userId: number, productId: number, quantity: number): Promise<Cart>{
        return this.cartService.addItemToCart(userId, productId, quantity);
    }

    @Mutation(() => Cart)
    async removeItemFromCart(userId: number, cartItemId: number): Promise<Cart> {
        return this.cartService.removeItemFromCart(userId, cartItemId);
    }    
}