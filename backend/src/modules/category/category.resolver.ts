import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';
import { CreateCategoryInput } from './dto/create-category.input';
import { GetUser } from 'src/shared/decorators/user.decorator';
import { User } from '../user/entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { UserResponse } from '../user/dto/user-response.input';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Mutation(() => Category)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async createCategory(
    @Args('createCategoryInput') createCategoryInput: CreateCategoryInput,
    @GetUser() user: User,
  ) {
    return await this.categoryService.createCategory(createCategoryInput, user);
  }

  @Mutation(() => UserResponse)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async removeCategory(
    @Args('id', { type: () => String }) id: string,
  ): Promise<UserResponse> {
    return await this.categoryService.removeCategory(id);
  }
}
