import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product} from './models/product'
import { UserModule } from "src/users/users.module";
import { ProductService } from "./product.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Product]),
        UserModule
    ],
    providers: [ProductService],
    exports: [ProductService]
})
export class ProductModule {}