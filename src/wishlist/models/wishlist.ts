import { Field, Int, ObjectType } from "@nestjs/graphql";
import { IsNumber } from "class-validator";
import { Product } from "src/product/models/product";
import { User } from "src/users/models/user";
import { Column, Entity, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'wishlist' })
@ObjectType()
export class WishList {
    @PrimaryGeneratedColumn()
    @IsNumber()
    @Field(() => Int)
    id: number;

    @OneToOne(() => User, { onDelete: 'CASCADE' })
    @Field(() => User)
    user: User;

    @Column()
    @IsNumber()
    @Field(() => Int)
    userId: number;

    @ManyToMany(() => Product, {
        cascade: true,  
        onDelete: 'CASCADE',
    })
    @JoinTable()
    @Field(() => [Product])
    product: Product[];  
}
