import { Field, ObjectType } from "@nestjs/graphql";
import { Product } from "src/product/models/product";
import { User } from "src/users/models/user";
import { Column, Entity, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'wishlist'})
@ObjectType()
export class WishList {
    @PrimaryGeneratedColumn()
    @Field()
    id: number;

    @OneToOne(() => User, {onDelete:'CASCADE'})
    @Field(() => User)
    user: User;

    @Column()
    @Field()
    userId: number;

    @ManyToMany(()=> Product, {onDelete:'CASCADE'})
    @JoinTable()
    product: Product[]

    @Column()
    @Field()
    productId: number;
}