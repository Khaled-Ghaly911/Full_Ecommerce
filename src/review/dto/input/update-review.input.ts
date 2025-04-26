import { Field, InputType, Int } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

@InputType()
export class UpdateReviewInput {
    @IsNumber()
    @IsNotEmpty()
    @Field(() => Int)
    id: number;

    @IsNumber()
    @IsOptional()
    @Field(() => Int, { nullable: true })
    rating?: number;

    @IsString()
    @IsOptional()
    @Field({ nullable: true })
    comment?: string;

    @IsNumber()
    @IsOptional()
    @Field(() => Int, { nullable: true })
    productId?: number;
    
    @IsNumber()
    @IsOptional()
    @Field(() => Int, { nullable: true })
    userId?: number;
}