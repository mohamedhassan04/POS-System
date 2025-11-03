import { Field, HideField, ObjectType } from '@nestjs/graphql';
import { UserRole } from 'src/shared/enum/enum.type';
import { Node } from 'src/shared/node/common.entity';
import { Entity, Column } from 'typeorm';

@Entity({ name: 'tb_users' })
@ObjectType()
export class User extends Node {
  @Column({ unique: true })
  @Field()
  username: string;

  @Column()
  @Field()
  password: string;

  @Column({ nullable: true })
  @Field()
  displayName?: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  @Field({ defaultValue: UserRole.USER })
  role: UserRole;
}
