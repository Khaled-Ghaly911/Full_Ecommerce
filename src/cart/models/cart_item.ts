import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Cart } from './cart';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/product/models/product';
import { IsOptional } from 'class-validator';

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
    @Field(() => Product)
    product: Product;

    @ManyToOne(() => Cart, { onDelete: 'CASCADE' })
    @IsOptional()
    @Field(() => Cart, { nullable: true })
    cart?: Cart;
}