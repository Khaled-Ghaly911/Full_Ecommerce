import { Module } from "@nestjs/common";
import { UserService } from "./users.service";
import { UserResolver } from "./users.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./models/user";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
    ],
    providers: [
        UserService,
        UserResolver
    ],
    exports: [UserService]
})
export class UserModule {}
