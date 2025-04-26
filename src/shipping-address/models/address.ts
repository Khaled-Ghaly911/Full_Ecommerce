import { 
    Field, 
    Int, 
    ObjectType 
} from "@nestjs/graphql";
import { 
    IsNotEmpty, 
    IsOptional, 
    IsString 
} from "class-validator";
import { User } from "src/users/models/user";
import { 
    Column, 
    Entity, 
    JoinColumn, 
    ManyToOne, 
    PrimaryGeneratedColumn
} from "typeorm";

@Entity({ name: 'shipping_address' })
@ObjectType()
export class ShippingAddress {
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id: number;

    @Column()
    @Field()
    @IsString()
    @IsNotEmpty()
    address: string;

    @Column()
    @Field()
    @IsString()
    @IsNotEmpty()
    city: string;

    @Column()
    @Field()
    @IsString()
    @IsNotEmpty()
    state: string;

    @Column()
    @Field()
    @IsString()
    @IsNotEmpty()
    country: string;

    @Column()
    @Field()
    @IsString()
    @IsOptional()
    postalCode: string;

    @Column()
    @Field()
    @IsString()
    @IsNotEmpty()
    phoneNumber: string;

    @ManyToOne(() => User, (user) => user.addresses, { eager: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId'})
    @Field(() => User)
    user: User;

    @Column()
    @Field(() => Int, { nullable: false })
    userId: number;
}