import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "./models/category";
import { Repository } from "typeorm";
import { CreateCategoryInput } from "./dto/inputs/create-category.input";

export class CategoryService {
    constructor(
       @InjectRepository(Category) 
       private categoryRepo: Repository<Category> 
    ) {}

    async getAllCategorys(): Promise<Category[]> {
        const categories: Category[] = await this.categoryRepo.find();
        if (categories.length === 0) {
            throw new NotFoundException('No categories found');
        }

        return categories;
    }

    async getCategoryByName(name: string): Promise<Category> {
        const category: Category | null = await this.categoryRepo.findOneBy({ name });
        if (!category) {
            throw new NotFoundException('Category not found');
        }

        return category;
    }

    async getCategoryById(id: number): Promise<Category> {
        const category: Category | null = await this.categoryRepo.findOneBy({ id })
        if(!category) {
            throw new NotFoundException('Category not found');
        }

        return category;
    }

    async createCategory(categoryData: CreateCategoryInput): Promise<Category> {
        const category: Category =  this.categoryRepo.create(categoryData);
        return this.categoryRepo.save(category)
    }

    async updateCategory(id: number, categoryData: CreateCategoryInput): Promise<Category> {
        const category: Category | null = await this.categoryRepo.findOneBy({ id });

        if(!category) {
            throw new NotFoundException('Category not found');
        }

        Object.assign(category, categoryData);

        return this.categoryRepo.save(category);
    }

    async deleteCategory(id: number): Promise<Category> {
        const category: Category | null = await this.categoryRepo.findOneBy({ id});

        if(!category) {
            throw new NotFoundException('Category not found');
        }

        return this.categoryRepo.remove(category);
    }

}