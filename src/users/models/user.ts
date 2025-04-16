import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Field, ObjectType, Int } from "@nestjs/graphql";
import { IsOptional } from "class-validator";

@Entity({ name: 'user'})
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

    @Column({default: false})
    @IsOptional()
    @Field({defaultValue: false, nullable: true})
    verified: boolean;
}
