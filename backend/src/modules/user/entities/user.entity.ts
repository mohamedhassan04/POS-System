import { Field, HideField, ObjectType } from '@nestjs/graphql';
import { Category } from 'src/modules/category/entities/category.entity';
import { Order } from 'src/modules/orders/entities/order.entity';
import { Product } from 'src/modules/product/entities/product.entity';
import { UserRole } from 'src/shared/enum/enum.type';
import { Node } from 'src/shared/node/common.entity';
import { Entity, Column, OneToMany } from 'typeorm';

@Entity({ name: 'tb_users' })
@ObjectType()
export class User extends Node {
  @Column({ unique: true })
  @Field()
  username: string;

  @Column()
  @HideField()
  password: string;

  @Column({ nullable: true })
  @Field()
  displayName?: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  @Field({ defaultValue: UserRole.USER })
  role: UserRole;

  @OneToMany(() => Product, (product) => product.user)
  @Field(() => [Product], { nullable: true })
  products?: Product[];

  @OneToMany(() => Category, (category) => category.user)
  @Field(() => [Category], { nullable: true })
  categories?: Category[];

  @OneToMany(() => Order, (order) => order.user)
  @Field(() => [Order], { nullable: true })
  orders: Order[];
}
