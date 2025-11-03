import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly _userRepository: Repository<User>,
  ) {}

  async create(createUserInput: CreateUserInput) {
    const userExists = await this._userRepository.findOneBy({
      username: createUserInput.username,
    });
    if (userExists) {
      throw new Error('User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(createUserInput.password, salt);
    createUserInput.password = hashedPassword;

    const user = this._userRepository.create(createUserInput);
    await this._userRepository.save(user);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'User created successfully',
    };
  }

  async findAllUsers() {
    const users = await this._userRepository
      .createQueryBuilder('user')
      .orderBy('user.createdAt', 'DESC')
      .getMany();

    return users;
  }

  async findOneUserById(id: string) {
    const user = await this._userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .getOne();

    return user;
  }

  async findOneUserByUsername(username: string) {
    return this._userRepository.findOne({
      where: { username },
      select: ['id', 'username', 'password', 'displayName'],
    });
  }

  async removeUser(id: string) {
    const user = await this._userRepository.findOneBy({ id });
    if (!user) {
      throw new Error('User not found');
    }
    await this._userRepository.remove(user);
    return {
      statusCode: HttpStatus.OK,
      message: 'User removed successfully',
    };
  }
}
