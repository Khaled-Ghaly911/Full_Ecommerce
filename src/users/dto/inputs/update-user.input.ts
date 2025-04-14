import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";

@InputType()
export class UpdateUserInput {
    @Field()
    @IsNotEmpty()
    userId: string;

    @Field()
    @IsOptional()
    name: string;

    @Field()
    @IsOptional()
    password: string;
    
    @Field()
    @IsOptional()
    admin: boolean;

    @Field()
    @IsOptional()
    verified: boolean;
}