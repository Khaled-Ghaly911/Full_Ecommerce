import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ShippingAddressService } from './shipping-address.service';
import { ShippingAddress } from './models/address';
import { ShippingAddressInput } from './dto/create-shipping-address.input';
import { UpdateAddressInput } from './dto/update-address.input';

@Resolver(() => ShippingAddress)
export class ShippingAddressResolver {
    constructor(
        private shippingAddressService: ShippingAddressService,
    ){}

    @Query(() => [ShippingAddress])
    async getAddressByUserId(@Args('userId') userId: number): Promise<ShippingAddress[]> {
        return this.shippingAddressService.getAddressByUserId(userId);
    }
    
    @Query(() => [ShippingAddress])
    async getAllAddresses(): Promise<ShippingAddress[]> {
        return this.shippingAddressService.getAllAddresses();
    }

    @Mutation(() => ShippingAddress)
    async createShippingAddress(
        @Args('shippingAddressDto')
        shippingAddressDto: ShippingAddressInput
    ): Promise<ShippingAddress> {
        return await this.shippingAddressService.addShippingAddress(shippingAddressDto);
    }

    @Mutation(() => ShippingAddress)
    async updateAddress(
        @Args('updateAddressDto') 
        updateAddressDto: UpdateAddressInput
    ): Promise<ShippingAddress> {
        return this.shippingAddressService.updateShippingAddress(updateAddressDto);
    }

    @Mutation(() => ShippingAddress)
    async deleteAddressById(
        @Args('addressId') addressId: number
    ): Promise<ShippingAddress> {
        return this.shippingAddressService.deleteAddressById(addressId);
    }
}
