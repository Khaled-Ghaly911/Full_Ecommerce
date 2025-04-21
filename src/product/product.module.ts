import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product} from './models/product'
import { UserModule } from "src/users/users.module";
import { ProductService } from "./product.service";
import { ProductResolver } from "./product.resolver";
import { JwtModule } from "@nestjs/jwt";
import { Category } from "src/category/models/category";
import { CategoryModule } from "src/category/category.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Product]),
        UserModule,
        JwtModule,
        CategoryModule
    ],
    providers: [ProductService, ProductResolver],
    exports: [ProductService, ProductResolver]
})
export class ProductModule {}