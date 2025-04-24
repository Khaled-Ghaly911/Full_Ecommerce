import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from './models/product'
import { Repository } from "typeorm";
import { CreateProductInput } from "./dto/inputs/create-product.input";
import { PaginationDto } from "./dto/inputs/pagination.input";
import { getProductsOutput } from "./dto/outputs/get-products.output";

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product) 
        private productRepo: Repository<Product>
    ) {}

    async createProduct(productData: CreateProductInput): Promise<Product> {
        const product: Product = this.productRepo.create(productData);
        return this.productRepo.save(product);
    }

    async getAllProducts(paginationDto: PaginationDto): Promise<getProductsOutput>{
        const { page = 1, limit = 10 } = paginationDto;
        const skip = (page - 1) * limit;

        const [products, total] = await this.productRepo.findAndCount({
            skip,
            take: limit,
        });

        if (products.length === 0) {
            throw new NotFoundException('No products found');
        }

        const lastPage = Math.ceil(total / limit);
        
        if(products.length === 0) {
            throw new NotFoundException('No products found');
        }

        return {
            statusCode: 'success',
            products,
            total,
            currentPage: page,
            nextPage: page < lastPage ? page + 1 : null,
            prevPage: page > 1 ? page - 1 : null,
            lastPage: lastPage
        };
    }

    async getProductById(id: number): Promise<Product> {
        const product: Product | null = await this.productRepo.findOneBy({ id });

        if(!product) {
            throw new NotFoundException('Product not found');
        }

        return product;
    }

    async updateProduct(id: number, productData: Partial<Product>) {
        const product = await this.getProductById(id);

        Object.assign(product, productData);

        return this.productRepo.save(product);
    }

    async deleteProduct(id: number): Promise<Product> {
        const product: Product = await this.getProductById(id);

        await this.productRepo.delete({ id });

        return product;
    }

    async decreaseStock(id: number, quantity: number): Promise<Product> {
        const product: Product = await this.getProductById(id);
        
        if(!product) {
            throw new NotFoundException('product not found');
        }

        if(product.stock === 0) {
            throw new NotFoundException('product is out of stock! 🫗');
        }

        if(product.stock < quantity) {
            throw new NotFoundException('product is out of stock! 🫗');
        }

        product.stock -= quantity;
        console.log(`product stock decreased by ${quantity}`);

        return this.productRepo.save(product);
    }

}