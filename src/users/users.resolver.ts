import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { User } from "./models/user";
import { UserService } from "./users.service";
import { GetUserArgs } from "./dto/args/get-user.args";
import { CreateUserInput } from "./dto/inputs/create-user.input";
import { UpdateUserInput } from "./dto/inputs/update-user.input";
import { DeleteUserInput } from "./dto/inputs/delete-user.input";
import { UseGuards } from "@nestjs/common";
import { AdminGuard } from "src/guards/admin.guard";

@Resolver(() => User)
export class UserResolver {
    constructor(private userService: UserService){}

    @Query(() => User, { nullable: true })
    getUser(@Args() getUserArgs: GetUserArgs) {
        return this.userService.getUserById(getUserArgs.userId);
    }

    @Query(() => [User], {nullable: true})
    getUsers(){
        return this.userService.getUsers();
    }

    @UseGuards(AdminGuard)
    @Mutation(() => User)
    createUser(
        @Args('createUserData') createUserData: CreateUserInput
    ): Promise<User> {
        return this.userService.createUser(createUserData); 
    }

    @UseGuards(AdminGuard)
    @Mutation(() => User)
    updateUser(
        @Args('updateUserData') updateUserData: UpdateUserInput
    ): Promise<User> {
        return this.userService.updateUser(updateUserData);
    }

    @UseGuards(AdminGuard)
    @Mutation(() => User)
    deleteUser(
        @Args('deleteUserData') deleteUserData: DeleteUserInput
    ): Promise<User> {
        return this.userService.deleteUser(deleteUserData);
    }
}