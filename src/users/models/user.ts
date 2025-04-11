import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Field, ObjectType, Int } from "@nestjs/graphql";
import { IsOptional } from "class-validator";

@Entity({ name: 'Users'})
@ObjectType()
export class User {
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id: number;

    @Column()
    @Field()
    name: string;

    @Column()
    @Field()
    email: string;

    @Column()
    @Field()
    password: string;

    @Column({default: false})
    @IsOptional()
    @Field({defaultValue: false, nullable: true})
    admin: boolean;
}
