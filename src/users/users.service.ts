import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./models/user";
import { Repository } from "typeorm";
import { CreateUserInput } from "./dto/inputs/create-user.input";
import { UpdateUserInput } from "./dto/inputs/update-user.input";
import { DeleteUserInput } from "./dto/inputs/delete-user.input";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) 
        private userRepo: Repository<User>
    ){}

    async createUser(createUserData: CreateUserInput): Promise<User> {
        let user: User | null = await this.userRepo.findOneBy({email: createUserData.email});
        
        if(user) {
            throw new Error('this user already created');
        } else {
            user = await this.userRepo.create(createUserData);
        }

        return this.userRepo.save(user);
    }

    async updateUser(updateUserData: UpdateUserInput): Promise<User> {
        const user: User | null = await this.userRepo.findOneBy({id: parseInt(updateUserData.userId)});

        if(!user){
            throw new NotFoundException('User not found');
        }
        
        Object.assign(user, updateUserData);
        
        return await this.userRepo.save(user);
    }

    async deleteUser(deleteUserData: DeleteUserInput): Promise<User>{
        const user = await this.userRepo.findOneBy({ id: deleteUserData.userId });

        if (!user) {
            throw new Error('User not found');
        }

        await this.userRepo.delete({ id: deleteUserData.userId });

        return user;
    }

    async getUserByEmail(email: string): Promise<User | null> {
        let user: User | null = await this.userRepo.findOneBy({email});
        return user;
    }

    async getUserById(id: number): Promise<User> {
        const user: User | null = await this.userRepo.findOneBy({id})

        if(!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }

    async getUsers() {
        return await this.userRepo.find();
    }
}