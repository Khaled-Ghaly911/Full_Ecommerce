import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { OrderStatus } from 'src/order-history/models/oderHistory';

@InputType()
export class CreateOrderHistoryInput {
    @Field()
    @IsNotEmpty()
    @IsNumber()
    cartId: number;

    @IsNumber()
    @IsNotEmpty()
    @Field()
    totalAmount: number;

    @IsString()
    @IsNotEmpty()
    @Field(() => OrderStatus)
    status: OrderStatus;

    @IsNumber()
    @IsNotEmpty()
    @Field(() => Int)
    userId: number;
}
