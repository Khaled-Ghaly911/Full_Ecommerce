import { Field, InputType, Int } from "@nestjs/graphql";
import { IsNumber } from "class-validator";

@InputType()
export class AddToWishlistInput {
    @IsNumber()
    @Field(() => Int)
    userId: number;

    @IsNumber()
    @Field(() => Int)
    productId: number;
}