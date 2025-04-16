import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Field, ObjectType, Int } from "@nestjs/graphql";
import { IsOptional, IsUrl } from "class-validator";
import { IsString } from "class-validator";
import { IsNumber } from "class-validator";
import { IsNotEmpty } from "class-validator";

@Entity({name: 'product'})
@ObjectType()
export class Product {
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id: number;

    @Column()
    @Field()
    @IsString()
    @IsNotEmpty()
    name: string;

    @Column()
    @Field()
    @IsString()
    @IsNotEmpty()
    description: string;

    @Column()
    @IsNumber()
    @Field(() => Int)
    @IsNotEmpty()
    price: number;

    @Column()
    @IsNumber()
    @IsNotEmpty()
    @Field(() => Int)
    stock: number;

    @Column({default: 'white'})
    @IsString()
    @IsOptional()
    @Field({defaultValue: 'white', nullable: true})
    color: string;

    @Column({default: 'medium'})
    @IsString()
    @IsOptional()
    @Field({defaultValue: 'medium', nullable: true})
    size: string;

    @Column()
    @IsUrl()
    @IsNotEmpty()
    @Field()
    image: string;
}