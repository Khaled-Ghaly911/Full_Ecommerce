import { InputType, Field, Int } from "@nestjs/graphql";
import { IsString, IsNotEmpty, IsNumber, IsOptional, IsUrl  } from 'class-validator';

@InputType()
export class CreateProductInput {
    @IsString()
    @IsNotEmpty()
    @Field()
    name: string;

    @IsString()
    @IsNotEmpty()
    @Field()
    description: string;

    @IsNumber()
    @IsNotEmpty()
    @Field(() => Int)
    price: number;

    @IsNumber()
    @IsNotEmpty()
    @Field(() => Int)
    stock: number;

    @IsString()
    @IsOptional()
    @Field({ nullable: true})
    color?: string;

    @IsString()
    @IsOptional()
    @Field({ nullable: true })
    size?: string;

    @IsUrl()
    @IsNotEmpty()
    @Field()
    image: string;

    @IsNumber()
    @IsOptional()
    @Field(() => Int, { nullable: true })
    discound?: number;

    @IsNumber()
    @IsNotEmpty()
    @Field(() => Int)
    categoryId: number;

}