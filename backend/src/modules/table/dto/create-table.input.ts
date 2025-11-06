import { InputType, Field } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateTableInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  number: string;

  @Field()
  @IsNotEmpty()
  capacity: number;

  @Field({ defaultValue: false })
  @IsNotEmpty()
  @IsBoolean()
  isOccupied: boolean;
}
