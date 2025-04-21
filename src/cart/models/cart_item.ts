import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Cart } from './cart';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/product/models/product';

@Entity( { name: 'cart_item'})
@ObjectType()
export class CartItem {
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id: number;

    @Column()
    @Field(() => Int)
    quantity: number;

    @ManyToOne(() => Product, { eager: true})
    product: Product;

    @ManyToOne(() => Cart, { onDelete: 'CASCADE' })
    @Field(() => Cart)
    cart: Cart;
}