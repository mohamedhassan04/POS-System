import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { GetUser } from 'src/shared/decorators/user.decorator';
import { User } from '../user/entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { UserResponse } from '../user/dto/user-response.input';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Mutation(() => Product)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
    @GetUser() user: User,
  ) {
    return await this.productService.createProduct(createProductInput, user);
  }

  @Query(() => [Product], { name: 'findAllProducts' })
  async findAllProducts() {
    return await this.productService.findAllProducts();
  }

  @Query(() => [Product], { name: 'findAllProductsByCategory' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async findAllProductsByCategory(
    @Args('categoryId', { type: () => String }) categoryId: string,
  ) {
    return await this.productService.findAllProductsByCategory(categoryId);
  }

  @Query(() => Product, { name: 'findOneProductById' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    return await this.productService.findOneProductById(id);
  }

  @Mutation(() => UserResponse)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async removeProduct(
    @Args('id', { type: () => String }) id: string,
  ): Promise<UserResponse> {
    return await this.productService.removeProduct(id);
  }
}
