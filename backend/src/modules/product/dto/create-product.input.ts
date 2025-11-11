import { InputType, Field } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateProductInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsNotEmpty()
  price: number;

  @Field()
  @IsNotEmpty()
  preparationTime: number;

  @Field({ defaultValue: true })
  @IsNotEmpty()
  @IsBoolean()
  available: boolean;
}
