import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { OrderHistoryService } from './order-history.service';
import { OrderHistory } from './models/oderHistory';
import { CreateOrderHistoryInput } from './dto/input/create-order-history.input';
import { UpdateOrderHistoryInput } from './dto/input/update-order-history.input';
import { UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/guards/admin.guard';

@UseGuards(AdminGuard)
@Resolver(() => OrderHistory)
export class OrderHistoryResolver {
    constructor(
        private orderHistoryService: OrderHistoryService
    ){}

    @Query(() => [OrderHistory])
    async getAllOrderHistory(): Promise<OrderHistory[]> {
        return this.orderHistoryService.getAllOrderHistory()
    }

    @Query(() => OrderHistory)
    async getOrderHistoryById(
        @Args('id') id: number
    ): Promise<OrderHistory> {
        return this.orderHistoryService.getOrderHistoryById(id);
    }

    @Query(() => OrderHistory)
    async getOrderHistoryByCartId(
        @Args('cartId') cartId: number
    ): Promise<OrderHistory> {
        return this.orderHistoryService.getOrderHistoryByCartId(cartId);
    }

    @Mutation(() => OrderHistory)
    async createOrderHistory(
        @Args('createOrderHistoryDto') CreateOrderHistoryDto: CreateOrderHistoryInput
    ): Promise<OrderHistory> {
        return this.orderHistoryService.createOrderHistory(CreateOrderHistoryDto);
    }

    @Mutation(() => OrderHistory)
    async updateOrderHistory(
        @Args('updateOrderHistoryDto') updateOrderHistoryDto: UpdateOrderHistoryInput
    ): Promise<OrderHistory>{
        return this.orderHistoryService.updateOrderHistoryStatus(updateOrderHistoryDto);
    }
}
