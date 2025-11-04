import { ObjectType, Field } from '@nestjs/graphql';
import { Category } from 'src/modules/category/entities/category.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Node } from 'src/shared/node/common.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

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

  @ManyToOne(() => User, (user) => user.products)
  @Field(() => User)
  user: User;

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: 'CASCADE',
  })
  @Field(() => Category)
  category: Category;
}
