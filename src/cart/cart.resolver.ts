import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { CartService } from "./cart.service";
import { Cart } from "./models/cart";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/guards/auth.guard";
import { AddItemToCartInput } from "./dto/inputs/add-item-cart";
import { RemoveItemFromCartInput } from "./dto/inputs/remove-item-from-cart";

@UseGuards(AuthGuard)
@Resolver(() => Cart)
export class CartResolver {
    constructor(
        private cartService: CartService
    ) {}

    @Query(() => Cart)
    async getUserCart(@Args('userId') userId: number): Promise<Cart> {
        return this.cartService.getUserCart(userId);
    }

    @Mutation(() => Cart)
    async addItemToCart(
        @Args('addItemDto') addItemDto: AddItemToCartInput
    ): Promise<Cart>{
        return this.cartService.addItemToCart(addItemDto.userId, addItemDto.productId, addItemDto.quantity);
    }

    @Mutation(() => Cart)
    async removeItemFromCart(@Args('removeItemDto') removeItemDto: RemoveItemFromCartInput): Promise<Cart> {
        return this.cartService.removeItemFromCart(removeItemDto.userId, removeItemDto.cartItemId);
    }    

    @Mutation(() => Cart)
    async clearCart(@Args('userId') userId: number): Promise<Cart> {
        return this.cartService.clearCart(userId);
    }
}