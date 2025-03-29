import { ArgsType, Field } from "@nestjs/graphql";
import { IsArray, IsNotEmpty, IsNumber } from "class-validator";

@ArgsType()
export class GetUsersArgs {
    @Field(() => [String])
    @IsArray()
    id: number[];
}