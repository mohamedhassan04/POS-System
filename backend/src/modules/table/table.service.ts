import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateTableInput } from './dto/create-table.input';
import { UpdateTableInput } from './dto/update-table.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Table } from './entities/table.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TableService {
  constructor(
    @InjectRepository(Table)
    private readonly _tableRepository: Repository<Table>,
  ) {}
  async create(createTableInput: CreateTableInput) {
    const table = this._tableRepository.create(createTableInput);

    await this._tableRepository.save(table);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Table created successfully',
    };
  }

  async findAllTables() {
    const tables = await this._tableRepository
      .createQueryBuilder('table')
      .orderBy('table.createdAt', 'DESC')
      .getMany();

    return tables;
  }

  async updateDisponibilityOfTable(id: string) {
    const table = await this._tableRepository.findOneBy({ id: id });

    if (!table) {
      throw new Error('Table not found');
    }
    table.isOccupied = true;
    await this._tableRepository.save(table);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Table updated successfully',
    };
  }
}
