import { Field, ObjectType, Int } from "@nestjs/graphql";
import { Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/users/models/user";
import { CartItem } from "./cart_item";

@Entity({ name: 'cart'})
@ObjectType()
export class Cart {
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id: number;
    
    @OneToOne(() => User, (user) => user.cart, { eager: true })
    @JoinColumn()
    @Field(() => User)
    user: User;

    @OneToMany(()=> CartItem, (cartItem) => cartItem.cart, { eager: true })
    @Field(() => [CartItem])
    cartItems: CartItem[];
}