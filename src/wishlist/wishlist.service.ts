import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WishList } from './models/wishlist';
import { CreateWishlistInput } from './dto/input/create-wishlist.input';
import { UpdateWishlistInput } from './dto/input/update-wishlist.input';
import { ProductService } from 'src/product/product.service';
import { AddToWishlistInput } from './dto/input/add-to-wishlist.input';
import { UserService } from 'src/users/users.service';
import { User } from 'src/users/models/user';

@Injectable()
export class WishlistService {
    constructor(
        @InjectRepository(WishList)
        private wishlistRepo: Repository<WishList>,
        private productService: ProductService,
        private userService: UserService
    ){}

    async getAllWishlists(): Promise<WishList[]> {
        return this.wishlistRepo.find();
    }

    async getWishlistById(userId: number): Promise<WishList> {
        const wishlist:WishList | null = await this.wishlistRepo.findOneBy({userId});

        if(!wishlist) {
            throw new NotFoundException('the user have no wishlist')
        }

        return wishlist;
    }

    async createWishlist(
        createWishlistInput: CreateWishlistInput
    ): Promise<WishList>{
        const wishlist: WishList = this.wishlistRepo.create(createWishlistInput);
        return this.wishlistRepo.save(wishlist);
    }

    async updateWishlist(
        updateWishlistInput: UpdateWishlistInput
    ): Promise<WishList> {
        const wishlist: WishList | null = 
        await this.wishlistRepo.findOneBy({id:updateWishlistInput.id});
        
        if(!wishlist){
            throw new NotFoundException('the user have no wishlist');
        }

        Object.assign(wishlist, updateWishlistInput);

        return this.wishlistRepo.save(wishlist);
    }

    async addToWishlist(addToWishlistDto: AddToWishlistInput): Promise<WishList> {
        const { userId, productId } = addToWishlistDto;
        let wishlist = await this.wishlistRepo.findOne({
            where: { userId },
            relations: ['product'],
        });
    
        const user: User = await this.userService.getUserById(userId);

        if (!wishlist) {
            wishlist = this.wishlistRepo.create({
                userId,
                user,
                product: [],
            });
            await this.wishlistRepo.save(wishlist);
        }
    
        const product = await this.productService.getProductById(productId);
    
        if (!product) {
            throw new NotFoundException('Product not found');
        }
    
        if (wishlist.product.some(p => p.id === productId)) {
            throw new BadRequestException('Product already in wishlist');
        }
    
        wishlist.product = [...wishlist.product, product];
    
        return await this.wishlistRepo.save(wishlist);
    }
    
    
    async deleteFromWishlist(removeToWishlistDto: AddToWishlistInput): Promise<WishList> {
        const {productId,userId} = removeToWishlistDto;

        const wishlist = await this.wishlistRepo.findOne({
            where: { userId },
            relations: ['product'],
        });
    
        if (!wishlist) {
            throw new NotFoundException('Wishlist not found for this user.');
        }
    
        const productExists = wishlist.product.some(p => p.id === productId);
        
        if (!productExists) {
            throw new NotFoundException('Product not found in wishlist.');
        }
    
        wishlist.product = wishlist.product.filter(p => p.id !== productId);
    
        return await this.wishlistRepo.save(wishlist);
    }
    

    async deleteWishlist(wishlistId: number): Promise<WishList> {
        const wishlist: WishList | null = 
        await this.wishlistRepo.findOneBy({id: wishlistId});

        if(!wishlist){
            throw new NotFoundException('the user have no wishlist');
        }

        await this.wishlistRepo.delete({ id: wishlistId });

        return wishlist;
    }
}
