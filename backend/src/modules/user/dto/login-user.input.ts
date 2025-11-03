import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class LoginUserInput {
  @Field()
  @IsNotEmpty()
  username: string;

  @Field()
  @IsNotEmpty()
  password: string;
}

@ObjectType()
export class LoginResponse {
  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  access_token: string;
}

@ObjectType()
export class AccessTokenObject {
  @Field(() => String, { nullable: true })
  access_token?: string;
  @Field(() => String, { nullable: true })
  name: string;
  @Field(() => String, { nullable: true })
  id: string;
}

@ObjectType()
export class CurrentUserResponse {
  @Field(() => Int)
  status: number;

  @Field(() => AccessTokenObject)
  success: AccessTokenObject;
}
