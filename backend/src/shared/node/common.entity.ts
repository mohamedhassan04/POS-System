import { Field, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

/**@desc frequent element for all entity */

@ObjectType({ isAbstract: true })
export abstract class Node extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field((type) => String)
  id: string;

  @CreateDateColumn({ type: 'timestamp' })
  @Field((type) => Date)
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  @Field((type) => Date)
  updatedAt: Date;
}
