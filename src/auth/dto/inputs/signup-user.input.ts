import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class SignupUserDto {
    @Field()
    @IsNotEmpty()
    email: string;

    @Field()
    @IsNotEmpty()
    password: string;

    @Field()
    @IsNotEmpty()
    name: string;
}