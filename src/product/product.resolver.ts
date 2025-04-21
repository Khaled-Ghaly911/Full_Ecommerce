import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { Product } from './models/product';
import { ProductService } from './product.service';
import { CreateProductInput } from './dto/inputs/create-product.input';
import { UpdateProductInput } from './dto/inputs/update-product.input';
import { UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/guards/admin.guard';
import { getProductsOutput } from './dto/outputs/get-products.output';
import { PaginationDto } from './dto/inputs/pagination.input';


@Resolver(() => Product)
export class ProductResolver {
    constructor(
      private productService: ProductService,  
    ){}

    
    @Query(() => getProductsOutput)
    async getAllProducts(
        @Args('paginationDto') paginationDto: PaginationDto
    ): Promise<getProductsOutput> {
        return this.productService.getAllProducts(paginationDto);
    }

    @Query(() => Product)
    async getProductById(@Args('id') id: number): Promise<Product> {
        return this.productService.getProductById(id);
    }

    @UseGuards(AdminGuard)
    @Mutation(() => Product) 
    async createProduct(
        @Args('productData') productData: CreateProductInput
    ): Promise<Product> {
        return this.productService.createProduct(productData);
    }

    @UseGuards(AdminGuard)
    @Mutation(() => Product)
    async updateProduct(
        @Args('id') id: number, 
        @Args('updateData') updateData: UpdateProductInput
    ): Promise<Product>{
        return this.productService.updateProduct(id, updateData);
    }

    @UseGuards(AdminGuard)
    @Mutation(() => Product) 
    async deleteProduct(@Args('id') id: number): Promise<Product> {
        return this.productService.deleteProduct(id);
    }

    @UseGuards(AdminGuard)
    @Mutation(() => Product) 
    async decreaseStock(@Args('id') id: number): Promise<Product> {
        return this.productService.decreaseStock(id);
    }
}