import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class OrderStatusInput {
  @Field(() => String)
  status: string;

  @Field(() => Int)
  count: number;
}
