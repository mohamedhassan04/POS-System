import { ObjectType, Field } from '@nestjs/graphql';
import { Category } from 'src/modules/category/entities/category.entity';
import { OrderItem } from 'src/modules/orders/entities/order-item.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Node } from 'src/shared/node/common.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity({ name: 'tb_products' })
@ObjectType()
export class Product extends Node {
  @Column()
  @Field()
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  @Field()
  price: number;

  @Column({ default: true })
  @Field()
  available: boolean;

  @Column({ type: 'int', default: 300 })
  @Field()
  preparationTime: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  image: string;

  @ManyToOne(() => User, (user) => user.products)
  @Field(() => User)
  user: User;

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: 'CASCADE',
  })
  @Field(() => Category)
  category: Category;

  @OneToMany(() => OrderItem, (item) => item.product)
  @Field(() => [OrderItem], { nullable: true })
  orderItems: OrderItem[];
}
