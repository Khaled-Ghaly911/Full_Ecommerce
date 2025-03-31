import { InputType, Field } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

@InputType()
export class CreateUserInput {
    @Field()
    @IsString()
    @IsNotEmpty()
    name: string;

    @Field()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    password: string;

    @Field({defaultValue: false})
    @IsOptional()
    admin: boolean;
}