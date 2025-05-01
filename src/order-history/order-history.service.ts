import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderHistory } from './models/oderHistory';
import { Repository } from 'typeorm';
import { UpdateOrderHistoryInput } from './dto/input/update-order-history.input';
import { CreateOrderHistoryInput } from './dto/input/create-order-history.input';

@Injectable()
export class OrderHistoryService {
    constructor(
        @InjectRepository(OrderHistory) 
        private orderHistoryRepo: Repository<OrderHistory>
    ){}

    async getOrderHistoryById(id: number): Promise<OrderHistory> {
        const orderHistory: OrderHistory|null = await this.orderHistoryRepo.findOneBy({id});
        
        if(!orderHistory) {
            throw new NotFoundException('order is not found');
        }

        return orderHistory;
    }

    async getAllOrderHistory(): Promise<OrderHistory[]>{
        return this.orderHistoryRepo.find();
    }


    async getOrderHistoryByCartId(cartId: number) {
        const orderHistory: OrderHistory|null = await this.orderHistoryRepo.findOneBy({cartId});
        
        if(!orderHistory) {
            throw new NotFoundException('order is not found');
        }

        return orderHistory;
    }

    async createOrderHistory(
        createOrderHistoryDto: CreateOrderHistoryInput
    ): Promise<OrderHistory> {
        const orderHistory: OrderHistory = await this.orderHistoryRepo.create(createOrderHistoryDto)
        return this.orderHistoryRepo.save(orderHistory);
    }

    async updateOrderHistoryStatus(
        updateOrderHistoryDto: UpdateOrderHistoryInput
    ): Promise<OrderHistory> {
        const { cartId } = updateOrderHistoryDto;
        const orderHistory: OrderHistory|null = await this.orderHistoryRepo.findOneBy({ cartId })

        if(!orderHistory) {
            throw new NotFoundException('order history not found');
        }

        Object.assign(orderHistory, updateOrderHistoryDto);

        return this.orderHistoryRepo.save(orderHistory);
    }
}
