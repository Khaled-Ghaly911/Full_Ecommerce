import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";

@InputType()
export class CreateCategoryInput {
    @IsString()
    @IsNotEmpty()
    @Field()
    name: string;
}