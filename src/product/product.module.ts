import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product} from './models/product'
import { UserModule } from "src/users/users.module";
import { ProductService } from "./product.service";
import { ProductResolver } from "./product.resolver";
import { JwtModule, JwtService } from "@nestjs/jwt";

@Module({
    imports: [
        TypeOrmModule.forFeature([Product]),
        UserModule,
        JwtModule,
        
    ],
    providers: [ProductService, ProductResolver],
    exports: [ProductService, ProductResolver]
})
export class ProductModule {}