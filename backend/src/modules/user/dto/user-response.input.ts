import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserResponse {
  @Field(() => Int)
  statusCode: number;

  @Field()
  message: string;
}
