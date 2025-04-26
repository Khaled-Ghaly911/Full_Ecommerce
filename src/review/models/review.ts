import { Field, Int, ObjectType } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Product } from "src/product/models/product";
import { User } from "src/users/models/user";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";

@Entity({ name: 'review' })
@ObjectType()
export class Review {
    @PrimaryGeneratedColumn()
    @IsNumber()
    @Field(() => Int)
    id: number;

    @IsNumber()
    @IsNotEmpty()
    @Column()
    @Field()
    rating: number;

    @IsNotEmpty()
    @IsString()
    @Column()
    @Field()
    comment: string;

    @ManyToOne(() => Product, { onDelete: "CASCADE" })
    @JoinColumn({ name: "productId" })
    @Field(() => Product)
    product: Product;

    @IsNotEmpty()
    @IsNumber()
    @Column()
    @Field()
    productId: number;

    @ManyToOne(() => User, { onDelete: "CASCADE" })
    @JoinColumn({ name: "userId" })
    @Field(() => User)
    user: User;

    @IsNotEmpty()
    @IsNumber()
    @Column()
    @Field()
    userId: number;
}
