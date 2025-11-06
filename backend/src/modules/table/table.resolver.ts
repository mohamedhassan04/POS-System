import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TableService } from './table.service';
import { Table } from './entities/table.entity';
import { CreateTableInput } from './dto/create-table.input';
import { UserResponse } from '../user/dto/user-response.input';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Table)
export class TableResolver {
  constructor(private readonly tableService: TableService) {}

  @Mutation(() => UserResponse)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async createTable(
    @Args('createTableInput') createTableInput: CreateTableInput,
  ): Promise<UserResponse> {
    return await this.tableService.create(createTableInput);
  }

  @Query(() => [Table], { name: 'findAllTables' })
  async findAllTables() {
    return await this.tableService.findAllTables();
  }

  @Mutation(() => UserResponse)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async updateDisponibilityOfTable(
    @Args('id', { type: () => String }) id: string,
  ): Promise<UserResponse> {
    return this.tableService.updateDisponibilityOfTable(id);
  }
}
