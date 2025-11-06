import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Order } from './order.entity';
import { Product } from 'src/modules/product/entities/product.entity';
import { Node } from 'src/shared/node/common.entity';

@Entity({ name: 'tb_order_items' })
@ObjectType()
export class OrderItem extends Node {
  @ManyToOne(() => Order, (order) => order.items)
  @Field(() => Order)
  order: Order;

  @ManyToOne(() => Product, (product) => product.orderItems)
  @Field(() => Product)
  product: Product;

  @Column()
  @Field()
  quantity: number;

  @Column({ type: 'int', default: 0 })
  @Field()
  expectedTime: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  @Field()
  price: number;
}
