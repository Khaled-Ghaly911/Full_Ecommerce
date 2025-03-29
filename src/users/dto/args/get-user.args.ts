import { ArgsType, Field } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber } from "class-validator";

@ArgsType()
export class GetUserArgs {
    @Field()
    @IsNotEmpty()
    @IsNumber()
    userId: number;
}