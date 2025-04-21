import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Field, ObjectType, Int } from "@nestjs/graphql";
import { 
    IsString, 
    IsNumber, 
    IsNotEmpty, 
    IsOptional, 
    IsUrl 
} from "class-validator";
import { Category } from "src/category/models/category";

@Entity({name: 'product'})
@ObjectType()
export class Product {
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id: number;

    @Column()
    @Field()
    @IsString()
    @IsNotEmpty()
    name: string;

    @Column()
    @Field()
    @IsString()
    @IsNotEmpty()
    description: string;

    @Column()
    @IsNumber()
    @Field(() => Int)
    @IsNotEmpty()
    price: number;

    @Column()
    @IsNumber()
    @IsNotEmpty()
    @Field(() => Int)
    stock: number;

    @Column({default: 'white'})
    @IsString()
    @IsOptional()
    @Field({defaultValue: 'white', nullable: true})
    color: string;

    @Column({default: 'medium'})
    @IsString()
    @IsOptional()
    @Field({defaultValue: 'medium', nullable: true})
    size: string;

    @Column()
    @IsUrl()
    @IsNotEmpty()
    @Field()
    image: string;

    @ManyToOne(() => Category, (category) => category.product, { onDelete: 'CASCADE'})
    @Field(() => Category, { nullable: true })
    category: Category;

    @Column({nullable: true})
    @Field(() => Int, { nullable: true})
    discount: number;
}