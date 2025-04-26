import { Field, InputType, Int } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class AddItemToCartInput {
    @IsNotEmpty()
    @Field(() => Int)
    userId: number;

    @IsNotEmpty()
    @Field(() => Int)
    productId: number;

    @IsNotEmpty()
    @Field(() => Int)
    quantity: number;

    @IsNotEmpty()
    @Field(() => Int)
    cartId: number;
}