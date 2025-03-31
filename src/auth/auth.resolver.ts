import { Args, Context, Mutation, Resolver } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { CreateUserInput } from "src/users/dto/inputs/create-user.input";
import { User } from "src/users/models/user";
import { LoginUserDto } from "./dto/inputs/login-user.input";

@Resolver()
export class AuthResolver {
    constructor(private authService: AuthService){}

    @Mutation()
    async signUp(@Args('signupData') signupData: CreateUserInput): Promise<User> {
        return this.authService.signUp(signupData);
    }

    @Mutation()
    async login(@Args('loginUserData') loginUserData: LoginUserDto, @Context() ctx) {
      return this.authService.logIn(loginUserData, ctx.req.session);
    }

    @Mutation(() => Boolean)
    async logout(@Context() ctx) {
      this.authService.logout(ctx.req.session);
      return true;
    }
}