import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UserResponse } from './dto/user-response.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserResponse)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<UserResponse> {
    return await this.userService.create(createUserInput);
  }

  @Query(() => [User], { name: 'getAllUsers' })
  async findAllUsers() {
    return await this.userService.findAllUsers();
  }

  @Query(() => User, { name: 'getUserById' })
  async findOneUserById(@Args('id', { type: () => String }) id: string) {
    return this.userService.findOneUserById(id);
  }

  @Query(() => User, { name: 'getUserByUsername' })
  async findOneUserByUsername(
    @Args('username', { type: () => String }) username: string,
  ) {
    return this.userService.findOneUserByUsername(username);
  }

  @Mutation(() => UserResponse)
  removeUser(
    @Args('id', { type: () => String }) id: string,
  ): Promise<UserResponse> {
    return this.userService.removeUser(id);
  }
}
