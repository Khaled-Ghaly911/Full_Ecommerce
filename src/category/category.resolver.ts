import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { Category } from "./models/category";
import { CategoryService } from "./category.service";
import { CreateCategoryInput } from "./dto/inputs/create-category.input";

@Resolver(() => Category)
export class CategoryResolver {
    constructor(
        private categoryService: CategoryService,
    ) {}

    @Query(() => [Category])
    async getAllCategories(): Promise<Category[]> {
        return this.categoryService.getAllCategorys();
    }

    @Query(() => Category)
    async getCategoryById(@Args('id') id: number): Promise<Category> {
        return this.categoryService.getCategoryById(id);
    }

    @Query(() => Category)
    async getCategoryByName(@Args('name') name: string): Promise<Category> {
        return this.categoryService.getCategoryByName(name);
    }

    @Mutation(() => Category)
    async createCategory(
        @Args('createCategoryData') 
        createCategoryData: 
        CreateCategoryInput
    ): Promise<Category> {
        return this.categoryService.createCategory(createCategoryData);
    }

    @Mutation(() => Category) 
    async updateCategory(
        @Args('id') id: number,
        @Args('updateCategoryData') updateCategoryData: CreateCategoryInput
    ): Promise<Category> {
        return this.categoryService.updateCategory(id, updateCategoryData);
    }

    @Mutation(() => Category)
    async deleteCategory(@Args('id') id: number): Promise<Category> {
        return this.categoryService.deleteCategory(id);
    }
}