import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { OrderStatus } from 'src/order-history/models/oderHistory';

@InputType()
export class UpdateOrderHistoryInput {
    @Field({ nullable:true })
    @IsNotEmpty()
    @IsNumber()
    cartId: number;

    @IsNumber()
    @IsOptional()
    @Field()
    totalAmount?: number;

    @IsString()
    @IsOptional()
    @Field(() => OrderStatus, { nullable:true })
    status?: OrderStatus;

    @IsNumber()
    @IsOptional()
    @Field({ nullable:true })
    userId?: number;
}
