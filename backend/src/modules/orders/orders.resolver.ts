import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { OrdersService } from './orders.service';
import { Order } from './entities/order.entity';
import { CreateOrderInput } from './dto/create-order.input';
import { GetUser } from 'src/shared/decorators/user.decorator';
import { User } from '../user/entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from 'src/shared/decorators/roles.decorator';

@Resolver(() => Order)
export class OrdersResolver {
  constructor(private readonly ordersService: OrdersService) {}

  @Mutation(() => Order)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async createOrder(
    @Args('createOrderInput') createOrderInput: CreateOrderInput,
    @GetUser() user: User,
  ) {
    return await this.ordersService.createOrder(createOrderInput, user);
  }

  @Query(() => [Order], { name: 'findAllOrders' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async findAllOrders() {
    return await this.ordersService.findAllOrders();
  }
}
