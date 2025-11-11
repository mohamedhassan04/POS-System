import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
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

  async findAllOrdersByStatus() {
    const orders = await this._orderRepository
      .createQueryBuilder('order')
      .getMany();

    if (!orders.length) return [];

    const statusCounts = orders.reduce(
      (acc, order) => {
        acc[order.status] = (acc[order.status] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    return Object.entries(statusCounts).map(([status, count]) => ({
      status,
      count,
    }));
  }

  async updateOrdersStatus(id: string, status: OrderStatus) {
    const order = await this._orderRepository.findOne({ where: { id } });
    if (!order) throw new NotFoundException('Order not found');

    order.status = status;
    await this._orderRepository.save(order);

    if (status === OrderStatus.READY) {
      order.readyAt = new Date();
      await this._orderRepository.save(order);
    }

    if (status === OrderStatus.SERVED) {
      order.deliveredAt = new Date();
      await this._orderRepository.save(order);
    }

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Order status updated successfully',
    };
  }

  async getActiveOrdersWithDuration() {
    const orders = await this._orderRepository.find({
      where: [
        { status: OrderStatus.PENDING },
        { status: OrderStatus.IN_PROGRESS },
      ],
      relations: ['table', 'items', 'items.product'],
    });

    return orders.map((order) => ({
      ...order,
      waitingDuration: this.calculateOrderPreparationTime(order),
      remainingTime: this.calculateRemainingTime(order),
      avrgWaitingTime: this.calculateAverageWaitingTime(order),
    }));
  }

  private calculateRemainingTime(order: Order): string {
    if (!order.startedAt) return 'Not started waiting yet';

    const [hours, minutes, seconds] = order.startedAt.split(':').map(Number);
    const started = new Date();
    started.setHours(hours, minutes, seconds, 0);

    const end = order.deliveredAt
      ? (() => {
          const [h, m, s] = order.deliveredAt
            .toTimeString()
            .split(':')
            .map(Number);
          const d = new Date();
          d.setHours(h, m, s, 0);
          return d;
        })()
      : new Date();

    const durationMs = end.getTime() - started.getTime();

    if (durationMs < 0) return 'Invalid time range';

    const mins = Math.floor(durationMs / 60000);
    const secs = Math.floor((durationMs % 60000) / 1000);

    return `${mins} min ${secs} sec`;
  }

  private calculateOrderPreparationTime(order: Order): string {
    if (!order.items || order.items.length === 0 || order.status === 'SERVED')
      return 'No items in order';

    const totalSeconds = order.items.reduce((total, item) => {
      const productPrep = item.product?.preparationTime || 0;
      return total + productPrep * item.quantity;
    }, 0);

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes} min ${seconds} sec`;
  }

  private calculateAverageWaitingTime(order: Order): string {
    const remainingStr = this.calculateRemainingTime(order);
    const preparationStr = this.calculateOrderPreparationTime(order);

    function parseTime(timeStr: string): number | null {
      const match = timeStr.match(/(\d+)\s*min\s*(\d+)\s*sec/);
      if (!match) return null;
      const mins = parseInt(match[1], 10);
      const secs = parseInt(match[2], 10);
      return mins * 60 + secs;
    }

    const remainingSeconds = parseTime(remainingStr);
    const preparationSeconds = parseTime(preparationStr);

    if (remainingSeconds === null || preparationSeconds === null) {
      return 'Invalid time format';
    }

    const averageSeconds = Math.floor(preparationSeconds - remainingSeconds);

    const avgMinutes = Math.floor(averageSeconds / 60);
    const avgSeconds = averageSeconds % 60;

    return `${avgMinutes} min ${avgSeconds} sec`;
  }
}
