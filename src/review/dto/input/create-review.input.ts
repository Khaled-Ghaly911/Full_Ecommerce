import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

@InputType()
export class CreateReviewInput {
    @IsNumber()
    @IsNotEmpty()
    @Field()
    rating: number;

    @IsString()
    @IsNotEmpty()
    @Field()
    comment: string;

    @IsNumber()
    @IsNotEmpty()
    @Field()
    productId: number;
    
    @IsNumber()
    @IsNotEmpty()
    @Field()
    userId: number;
}