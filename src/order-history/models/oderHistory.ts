import { ObjectType, Field, Float, registerEnumType, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
import { User } from 'src/users/models/user';
import { CartItem } from 'src/cart/models/cart_item';
import { IsNotEmpty, IsNumber } from 'class-validator';

export enum OrderStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

registerEnumType(OrderStatus, {
  name: 'OrderStatus',
  description: 'The status of the order',
});

@ObjectType()
@Entity()
export class OrderHistory {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Field(() => User)
  @ManyToOne(() => User)
  user: User;

  @Column()
  @IsNumber()
  @IsNotEmpty()
  @Field(() => Int)
  userId: number;


  @Field()
  @Column()
  @IsNotEmpty()
  @IsNumber()
  cartId: number;

  @Field(() => Float)
  @Column('decimal', { precision: 10, scale: 2 })
  totalAmount: number;

  @Field(() => OrderStatus, { defaultValue: OrderStatus.PENDING })
  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;

  @Field()
  @CreateDateColumn()
  createdAt: Date;
}
