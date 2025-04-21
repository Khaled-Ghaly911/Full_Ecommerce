import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { Category } from "./models/category";
import { CategoryService } from "./category.service";
import { CategoryResolver } from "./category.resolver";
import { ProductModule } from "src/product/product.module";
import { Product } from "src/product/models/product";

@Module({
    imports: [
        TypeOrmModule.forFeature([Category, Product])
    ],
    providers: [CategoryService, CategoryResolver],
    exports: [CategoryService, CategoryResolver]
})
export class CategoryModule {}