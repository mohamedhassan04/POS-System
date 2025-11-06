import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateOrderItemInput {
  @Field(() => String)
  @IsNotEmpty()
  productId: string;

  @Field(() => Int)
  @IsNotEmpty()
  quantity: number;
}

@InputType()
export class CreateOrderInput {
  @Field(() => String)
  @IsNotEmpty()
  tableId: string;

  @Field(() => [CreateOrderItemInput])
  @IsNotEmpty()
  items: CreateOrderItemInput[];
}
