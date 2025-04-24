import { InputType, Field, Int } from "@nestjs/graphql";
import { IsString, IsOptional, IsNumber, IsUrl  } from 'class-validator';

@InputType()
export class UpdateProductInput {
    @IsString()
    @IsOptional()
    @Field({ nullable: true })
    name?: string;

    @IsString()
    @IsOptional()
    @Field({ nullable: true })
    description?: string;

    @IsNumber()
    @IsOptional()
    @Field(() => Int, { nullable: true })
    price?: number;

    @IsNumber()
    @IsOptional()
    @Field(() => Int, { nullable: true })
    stock?: number;

    @IsString()
    @IsOptional()
    @Field({ nullable: true })
    color?: string;

    @IsString()
    @IsOptional()
    @Field({ nullable: true })
    size?: string;

    @IsUrl()
    @IsOptional()
    @Field({ nullable: true })
    image?: string;

    @IsNumber()
    @IsOptional()
    @Field(() => Int, { nullable: true })
    discound?: number;

    @IsNumber()
    @IsOptional()
    @Field(() => Int, { nullable: true })
    categoryId?: number;
}