import { Field, ObjectType } from '@nestjs/graphql';
import { Order } from 'src/modules/orders/entities/order.entity';
import { Node } from 'src/shared/node/common.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'tb_tables' })
@ObjectType()
export class Table extends Node {
  @Column({ unique: true })
  @Field()
  number: string;

  @Column()
  @Field()
  capacity: number;

  @Column({ type: 'boolean', default: false })
  @Field({ nullable: true })
  isOccupied: boolean;

  @OneToMany(() => Order, (order) => order.table)
  @Field(() => [Order], { nullable: true })
  orders: Order[];
}
