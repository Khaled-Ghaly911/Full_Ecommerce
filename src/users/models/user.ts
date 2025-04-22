import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Field, ObjectType, Int } from "@nestjs/graphql";
import { IsOptional } from "class-validator";
import { Cart } from "src/cart/models/cart";

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
}
