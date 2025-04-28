import { Column, Entity, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Field, ObjectType, Int } from "@nestjs/graphql";
import { IsOptional } from "class-validator";
import { Cart } from "src/cart/models/cart";
import { ShippingAddress } from "src/shipping-address/models/address";
import { WishList } from "src/wishlist/models/wishlist";

@Entity({ name: 'user'})
@ObjectType()
export class User {
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id: number;

    @Column()
    @Field()
    name: string;

    @Column()
    @Field()
    email: string;

    @Column()
    @Field()
    password: string;

    @Column({default: false})
    @IsOptional()
    @Field({defaultValue: false, nullable: true})
    admin: boolean;

    @Column({default: false})
    @IsOptional()
    @Field({defaultValue: false, nullable: true})
    verified: boolean;

    @OneToOne(() => Cart, (cart) => cart.user, { nullable: true })
    @Field(() => Cart)
    cart: Cart;

    @OneToMany(() => ShippingAddress, (address) => address.user)
    @Field(() => [ShippingAddress])
    addresses: ShippingAddress[];

    @OneToOne(() => WishList)
    @Field(() => WishList)
    wishlist: WishList;
}
