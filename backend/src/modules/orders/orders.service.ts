import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderInput } from './dto/create-order.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { OrderItem } from './entities/order-item.entity';
import { Product } from '../product/entities/product.entity';
import { Table } from '../table/entities/table.entity';
import { User } from '../user/entities/user.entity';
import { OrderStatus } from 'src/shared/enum/enum.type';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly _orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly _orderItemRepository: Repository<OrderItem>,
    @InjectRepository(Product)
    private readonly _productRepository: Repository<Product>,
    @InjectRepository(Table)
    private readonly _tableRepository: Repository<Table>,
  ) {}

  async createOrder(createOrderInput: CreateOrderInput, user: User) {
    const { tableId, items } = createOrderInput;

    const table = await this._tableRepository.findOne({
      where: { id: tableId },
    });
    if (!table) throw new NotFoundException('Table not found');

    const now = new Date();
    const startedAt = now.toTimeString().split(' ')[0];

    const newOrder = this._orderRepository.create({
      table,
      status: OrderStatus.PENDING,
      startedAt,
      user,
    });

    await this._orderRepository.save(newOrder);

    const orderItems: OrderItem[] = [];

    for (const item of items) {
      const product = await this._productRepository.findOne({
        where: { id: item.productId },
      });
      if (!product)
        throw new NotFoundException(`Product ${item.productId} not found`);

      const orderItem = this._orderItemRepository.create({
        order: newOrder,
        product,
        quantity: item.quantity,
        expectedTime: product.preparationTime * item.quantity,
        price: product.price * item.quantity,
      });

      orderItems.push(orderItem);
    }

    await this._orderItemRepository.save(orderItems);

    newOrder.totalAmount = orderItems.reduce(
      (acc, item) => acc + (Number(item.price) || 0),
      0,
    );

    const savedOrder = await this._orderRepository.save(newOrder);

    return this._orderRepository.findOne({
      where: { id: savedOrder.id },
      relations: ['user', 'table', 'items', 'items.product'],
    });
  }

  async findAllOrders() {
    const orders = await this._orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.user', 'user')
      .leftJoinAndSelect('order.table', 'table')
      .leftJoinAndSelect('order.items', 'items')
      .leftJoinAndSelect('items.product', 'product')
      .orderBy('order.createdAt', 'DESC')
      .getMany();

    return orders;
  }
}
