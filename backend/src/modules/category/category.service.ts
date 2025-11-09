import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryInput } from './dto/create-category.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { In, Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Product } from '../product/entities/product.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly _categoryRepository: Repository<Category>,
    @InjectRepository(Product)
    private readonly _productRepository: Repository<Product>,
  ) {}
  async createCategory(createCategoryInput: CreateCategoryInput, user: User) {
    const { name, productIds } = createCategoryInput;

    const category = this._categoryRepository.create({ name });

    if (productIds && productIds.length > 0) {
      const products = await this._productRepository.findBy({
        id: In(productIds),
      });
      category.products = products;
    }

    return await this._categoryRepository.save({
      ...category,
      user,
    });
  }

  async findAllCategory() {
    const categories = await this._categoryRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.products', 'product')
      .orderBy('category.createdAt', 'DESC')
      .getMany();
    return categories;
  }

  async removeCategory(id: string) {
    const category = await this._categoryRepository.findOneBy({ id });
    if (!category) {
      throw new Error('Category not found');
    }
    await this._categoryRepository.remove(category);
    return {
      statusCode: HttpStatus.OK,
      message: 'Category removed successfully',
    };
  }
}
