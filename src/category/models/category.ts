import { ObjectType, Field, Int } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";
import { Product } from "src/product/models/product";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity({ name: 'category' })
@ObjectType()
export class Category {
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id: number;

    @Column()
    @Field()
    @IsString()
    @IsNotEmpty()
    name: string;

    @OneToMany(() => Product, (product) => product.category, { onDelete: 'CASCADE'})
    @Field(() => [Product], { nullable: true})
    product: Product[];
}