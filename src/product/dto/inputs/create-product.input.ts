import { InputType, Field, Int } from "@nestjs/graphql";
import { IsString, IsNotEmpty, IsNumber, IsOptional, IsUrl, Min } from 'class-validator';

@InputType()
export class CreateProductInput {
  @IsString()
  @IsNotEmpty()
  @Field()
  name: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  description: string;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  @Field(() => Int)
  price: number;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  @Field(() => Int)
  stock: number;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  color?: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  size?: string;

  @IsUrl()
  @IsNotEmpty()
  @Field()
  image: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  @Field(() => Int, { nullable: true })
  discount?: number;

  @IsNumber()
  @IsNotEmpty()
  @Field(() => Int)
  categoryId: number;
}
