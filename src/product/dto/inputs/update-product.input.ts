import { InputType, Field, Int } from "@nestjs/graphql";
import { IsString, IsOptional, IsNumber, IsUrl  } from 'class-validator';

@InputType()
export class UpdateProductInput {
    @IsString()
    @IsOptional()
    @Field()
    name?: string;

    @IsString()
    @IsOptional()
    @Field()
    description?: string;

    @IsNumber()
    @IsOptional()
    @Field(() => Number)
    price?: number;

    @IsNumber()
    @IsOptional()
    @Field(() => Number)
    stock?: number;

    @IsString()
    @IsOptional()
    @Field({ nullable: true})
    color?: string;

    @IsString()
    @IsOptional()
    @Field({ nullable: true })
    size?: string;

    @IsUrl()
    @IsOptional()
    @Field()
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