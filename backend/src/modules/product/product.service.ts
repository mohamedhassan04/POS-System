import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly _productRepository: Repository<Product>,
  ) {}

  async createProduct(createProductInput: CreateProductInput, user: User) {
    const product = this._productRepository.create(createProductInput);
    return await this._productRepository.save({
      ...product,
      user,
    });
  }

  async findAllProducts() {
    const products = await this._productRepository
      .createQueryBuilder('product')
      .orderBy('product.createdAt', 'DESC')
      .getMany();
    return products;
  }

  async findAllProductsByCategory(categoryId: string) {
    const products = await this._productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .where('category.id = :categoryId', { categoryId })
      .orderBy('product.createdAt', 'DESC')
      .getMany();
    return products;
  }

  async findOneProductById(id: string) {
    const product = await this._productRepository
      .createQueryBuilder('product')
      .where('product.id = :id', { id })
      .getOne();
    return product;
  }

  async removeProduct(id: string) {
    const product = await this._productRepository.findOneBy({ id });
    if (!product) {
      throw new Error('Product not found');
    }
    await this._productRepository.remove(product);
    return {
      statusCode: HttpStatus.OK,
      message: 'Product removed successfully',
    };
  }
}
