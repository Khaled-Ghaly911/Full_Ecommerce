import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ShippingAddress } from './models/address';
import { ShippingAddressInput } from './dto/create-shipping-address.input';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthGuard } from 'src/guards/auth.guard';
import { UserService } from 'src/users/users.service';
import { NotFoundError } from 'rxjs';
import { User } from 'src/users/models/user';
import { UpdateAddressInput } from './dto/update-address.input';

@Injectable()
export class ShippingAddressService {
    constructor(
        @InjectRepository(ShippingAddress)
        private shippingAddressRepo: Repository<ShippingAddress>,
        private userService: UserService
    ){}

    async addShippingAddress(
        shippngAddressDto: ShippingAddressInput
    ): Promise<ShippingAddress> {
        const user = await this.userService.getUserById(shippngAddressDto.userId);
        const shippingAddress = this.shippingAddressRepo.create({...shippngAddressDto, user });
        return await this.shippingAddressRepo.save(shippingAddress)
    }

    async getAddressByUserId(userId: number): Promise<ShippingAddress[]> {
        const user: User = await this.userService.getUserById(userId);
        if (!user) {
            throw new NotFoundException('user not found');
        }

        const address: ShippingAddress[] | null = await this.shippingAddressRepo.findBy({ userId: user.id });

        if (!address) {
            throw new NotFoundException('address not set yet')
        }

        return address;
    }

    async updateShippingAddress(
        updateAddressDto: UpdateAddressInput
    ): Promise<ShippingAddress> {
        const address: ShippingAddress | null = await this.shippingAddressRepo.findOneBy({ id: updateAddressDto.id });

        if(!address) {
            throw new NotFoundException('address not found');
        }
        Object.assign(address, updateAddressDto);

        return this.shippingAddressRepo.save(address);
    }

    async getAllAddresses(): Promise<ShippingAddress[]> {
        const addresses: ShippingAddress[] = await this.shippingAddressRepo.find();

        if(addresses.length === 0) {
            throw new NotFoundException('No addresses for this user');
        }

        return addresses;
    }

    async deleteAddressById(addressId: number): Promise<ShippingAddress> {
        const address: ShippingAddress | null = await this.shippingAddressRepo.findOneBy({ id: addressId });
        
        if(!address) {
            throw new NotFoundException('address not found');
        }

        await this.shippingAddressRepo.delete(address);
        
        return address; 
    }

    
}
