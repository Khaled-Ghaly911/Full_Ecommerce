import { Module } from "@nestjs/common";
import { UserService } from "./users.service";
import { UserResolver } from "./users.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./models/user";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule
    ],
    providers: [
        UserService,
        UserResolver
    ],
    exports: [UserService]
})
export class UserModule {}
