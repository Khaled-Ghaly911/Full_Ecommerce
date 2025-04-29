import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { WishlistService } from './wishlist.service';
import { WishList } from './models/wishlist';
import { CreateWishlistInput } from './dto/input/create-wishlist.input';
import { UpdateWishlistInput } from './dto/input/update-wishlist.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { AddToWishlistInput } from './dto/input/add-to-wishlist.input';

@UseGuards(AuthGuard)
@Resolver()
export class WishlistResolver {
    constructor(
        private wishlistService: WishlistService,
    ){}

    @Query(() => [WishList])
    async getAllWishlists(): Promise<WishList[]> {
        return this.wishlistService.getAllWishlists();
    }

    @Query(() => WishList)
    async getWishlistById(
        @Args('userId') userId: number
    ): Promise<WishList> {
        return this.wishlistService.getWishlistById(userId);
    }

    @Mutation(() => WishList)
    async createWishlist(
        @Args('createWishlistDto') createWishlistDto: CreateWishlistInput
    ): Promise<WishList> {
        return this.wishlistService.createWishlist(createWishlistDto);
    }

    @Mutation(() => WishList)
    async updateWishlist(
        @Args('updateWishlistDto') updateWishlistDto: UpdateWishlistInput
    ): Promise<WishList> {
        return this.wishlistService.updateWishlist(updateWishlistDto);
    }

    @Mutation(() => WishList)
    async addToWishlist(
        @Args('addToWishlist') addToWishlistDto: AddToWishlistInput
    ): Promise<WishList> {
        return this.wishlistService.addToWishlist(addToWishlistDto)
    }

    @Mutation(() => WishList)
    async removeFromWishlist(
        @Args('RemoveToWishlist') removeToWishlistDto: AddToWishlistInput
    ): Promise<WishList> {
        return this.wishlistService.deleteFromWishlist(removeToWishlistDto)
    }

    @Mutation(() => WishList)
    async deleteWishlist(
        @Args('wishlistId') wishlistId: number
    ): Promise<WishList> {
        return this.deleteWishlist(wishlistId);
    }
}
