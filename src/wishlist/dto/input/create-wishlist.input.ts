import { Field, InputType, Int } from "@nestjs/graphql";
import { IsNumber } from "class-validator";

@InputType()
export class CreateWishlistInput {
    @IsNumber()
    @Field(() => Int)
    userId: number;
}