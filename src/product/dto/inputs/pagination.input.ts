import { Field, InputType, Int } from "@nestjs/graphql";
import { IsNumber, IsOptional, IsPositive } from "class-validator";

@InputType()
export class PaginationDto {
    @IsNumber()
    @IsPositive()
    @Field(() => Int)
    limit: number;

    @IsNumber()
    @IsPositive()
    @Field(() => Int)
    page: number;
}