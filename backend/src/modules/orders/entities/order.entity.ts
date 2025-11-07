import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/modules/user/entities/user.entity';
import { Node } from 'src/shared/node/common.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { OrderItem } from './order-item.entity';
import { OrderStatus } from 'src/shared/enum/enum.type';
import { Table } from 'src/modules/table/entities/table.entity';

@Entity({ name: 'tb_orders' })
@ObjectType()
export class Order extends Node {
  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  @Field()
  status: string;

  @ManyToOne(() => User, (user) => user.orders)
  @Field(() => User)
  user: User;

  @ManyToOne(() => Table, (table) => table.orders)
  @Field(() => Table)
  table: Table;

  @OneToMany(() => OrderItem, (item) => item.order, { cascade: true })
  @Field(() => [OrderItem])
  items: OrderItem[];

  @Column({ type: 'time', nullable: true })
  @Field({ nullable: true })
  startedAt?: string;

  @Column({ type: 'timestamp', nullable: true })
  @Field({ nullable: true })
  readyAt?: Date;

  @Column({ type: 'timestamp', nullable: true })
  @Field({ nullable: true })
  deliveredAt?: Date;

  @Column({ type: 'time', nullable: true })
  @Field(() => String, { nullable: true })
  waitingDuration?: string;

  @Column({ type: 'time', nullable: true })
  @Field(() => String, { nullable: true })
  remainingTime?: string;

  @Column({ type: 'time', nullable: true })
  @Field(() => String, { nullable: true })
  avrgWaitingTime?: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  @Field({ nullable: true })
  totalAmount: number;
}
