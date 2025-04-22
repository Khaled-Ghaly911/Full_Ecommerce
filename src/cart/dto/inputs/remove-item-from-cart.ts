import { Field, InputType, Int } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class RemoveItemFromCartInput {
    @IsNotEmpty()
    @Field(() => Int)
    userId: number;

    @IsNotEmpty()
    @Field(() => Int)
    cartItemId: number;
}