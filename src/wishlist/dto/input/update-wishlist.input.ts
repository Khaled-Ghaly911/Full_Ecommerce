import { Field, InputType, Int } from "@nestjs/graphql";
import { IsNumber } from "class-validator";

@InputType()
export class UpdateWishlistInput {
    @IsNumber()
    @Field(() => Int)
    id: number;

    @IsNumber()
    @Field(() => Int)
    userId: number;
}