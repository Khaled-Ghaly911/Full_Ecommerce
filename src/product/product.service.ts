import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from './models/product'
import { Repository } from "typeorm";
import { CreateProductInput } from "./dto/inputs/create-product.input";

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

    async getAllProducts(): Promise<Product[]>{
        const products: Product[] = await this.productRepo.find();

        if(products.length === 0) {
            throw new NotFoundException('No products found');
        }

        return products;
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

    async decreaseStock(id: number): Promise<Product> {
        const product: Product = await this.getProductById(id);
        
        if(!product) {
            throw new NotFoundException('product not found');
        }

        if(product.stock === 0) {
            throw new NotFoundException('product is out of stock! 🫗');
        }

        product.stock -= 1;

        return this.productRepo.save(product);
    }

}