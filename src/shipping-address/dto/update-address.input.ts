import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from "class-validator";

@InputType()
export class UpdateAddressInput {
    @IsNumber()
    @IsNotEmpty()
    @Field()
    id: number;
    
    @IsString()
    @IsOptional()
    @Field()
    address?: string;
    
    @IsString()
    @IsOptional()
    @Field()
    city?: string;

    @IsString()
    @IsOptional()
    @Field()
    state?: string;

    @IsString()
    @IsOptional()
    @Field()
    country?: string;

    @IsString()
    @IsOptional()
    @Field()
    postalCode?: string;

    @IsString()
    @IsOptional()
    @Field()
    phoneNumber?: string;
}