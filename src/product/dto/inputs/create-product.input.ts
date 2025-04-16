import { InputType, Field } from "@nestjs/graphql";
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
    @Field(() => Number)
    price: number;

    @IsNumber()
    @IsNotEmpty()
    @Field(() => Number)
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
}