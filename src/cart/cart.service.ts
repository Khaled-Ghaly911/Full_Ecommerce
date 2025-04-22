import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './models/cart';
import { CartItem } from './models/cart_item';
import { ProductService } from 'src/product/product.service';
import { Product } from 'src/product/models/product';


@Injectable()
export class CartService {
    constructor(
        @InjectRepository(Cart)
        private cartRepo: Repository<Cart>,
        @InjectRepository(CartItem)
        private cartItemRepo: Repository<CartItem>,
        private productService: ProductService
    ) {}

    async getUserCart(userId: number): Promise<Cart> {
        const cart: Cart | null = await this.cartRepo.findOne(
            { 
                where: { 
                    user: { id: userId }
                },
                relations: ['cartItems', 'cartItems.product']
        });

        if(!cart) {
            return await this.cartRepo.create({
                user: { id: userId},
                cartItems: []
            });
        }

        return cart;
    }

    async addItemToCart(userId: number, productId: number, quantity: number): Promise<Cart> {
        let cart = await this.cartRepo.findOneBy( { user: { id: userId }});
    
        if (!cart) {
            cart =  this.cartRepo.create({ user: { id: userId }, cartItems: [] });
        }
    
        const existingItem = cart.cartItems.find((item) => item.product.id === productId);
    
        if (existingItem) {
            existingItem.quantity += quantity;
            await this.cartItemRepo.save(existingItem);
        } else {
            const newItem = await this.createCartItem(quantity, productId, cart.id);
            cart.cartItems.push(newItem);
        }
    
        return this.cartRepo.save(cart); 
    }
    

    async createCartItem(
        quantity: number, 
        productId: number, 
        cartId: number
    ): Promise<CartItem> {
        const cart: Cart | null = await this.cartRepo.findOneBy( { id: cartId });
        const product: Product | null = await this.productService.getProductById(productId);
        
        if(!cart || !product) {
            throw new NotFoundException('cart or product not found');
        }

        const cartItem: CartItem = this.cartItemRepo.create({
            quantity,
            product: product,
            cart: cart
        })

        return this.cartItemRepo.save(cartItem);
    }

    async removeItemFromCart(
        userId: number,
        cartItemId: number
      ): Promise<Cart> {
        const cart = await this.cartRepo.findOne({
          where: { user: { id: userId } },
          relations: ['cartItems'],
        });
      
        if (!cart) throw new NotFoundException('Cart not found');
      
        const cartItem = cart.cartItems.find((item) => item.id === cartItemId);
        if (!cartItem) {
            throw new NotFoundException('Cart item not found in your cart');
        }
        await this.cartItemRepo.delete(cartItemId);
      
        cart.cartItems = cart.cartItems.filter((item) => item.id !== cartItemId);
        return cart;
      }
      

    async clearCart(userId: number): Promise<Cart> {
        const cart: Cart = await this.getUserCart(userId);
        await this.cartItemRepo.delete({ cart: { id: cart.id}})
        cart.cartItems = [];
        return cart;
    }
}
