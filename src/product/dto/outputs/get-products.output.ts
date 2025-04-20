import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { Product } from 'src/product/models/product';

@ObjectType()
export class getProductsOutput {
    @Field()
    @IsString()
    statusCode: string;

    @Field(() => [Product])
    products: Product[];

    @Field(() => Int)
    total: number;

    @Field(() => Int)
    currentPage: number;

    @Field(() => Int, { nullable: true })
    nextPage: number | null;

    @Field(() => Int, { nullable: true })
    prevPage: number | null;

    @Field(() => Int)
    lastPage: number;
}