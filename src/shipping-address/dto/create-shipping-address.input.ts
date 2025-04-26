import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

@InputType()
export class ShippingAddressInput {
    @IsString()
    @IsNotEmpty()
    @Field()
    address: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    city: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    state: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    country: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    postalCode: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    phoneNumber: string;

    @Field(() => Int)
    @IsNotEmpty()
    userId: number;
}