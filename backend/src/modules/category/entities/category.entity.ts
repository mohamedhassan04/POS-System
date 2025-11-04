import { ObjectType, Field } from '@nestjs/graphql';
import { Product } from 'src/modules/product/entities/product.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Node } from 'src/shared/node/common.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity({ name: 'tb_category' })
@ObjectType()
export class Category extends Node {
  @Column()
  @Field()
  name: string;

  @ManyToOne(() => User, (user) => user.categories)
  @Field(() => User)
  user: User;

  @OneToMany(() => Product, (product) => product.category)
  @Field(() => [Product], { nullable: true })
  products: Product[];
}
