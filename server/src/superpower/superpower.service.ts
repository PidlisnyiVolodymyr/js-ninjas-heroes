import { SuperPower } from './entities/superpower.entity';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSuperpowerDto } from './dto/create-superpower.dto';
import { UpdateSuperpowerDto } from './dto/update-superpower.dto';

@Injectable()
export class SuperpowerService {
  constructor(
    @InjectRepository(SuperPower)
    private readonly superPowersRepository: Repository<SuperPower>,
  ) {}

  async create(createSuperpowerDto: CreateSuperpowerDto) {
    const superPower = await this.superPowersRepository.findOne({
      where: { name: createSuperpowerDto.name },
    });
    if (superPower) {
      return new HttpException(
        'Superpower with this name is already exist',
        HttpStatus.CONFLICT,
      );
    }
    return await this.superPowersRepository.save(createSuperpowerDto);
  }

  async findAll() {
    return await this.superPowersRepository.find();
  }

  async findOne(id: string) {
    return await this.superPowersRepository.findOne({
      where: { id },
    });
  }

  async update(id: string, updateSuperpowerDto: UpdateSuperpowerDto) {
    return this.superPowersRepository.save({
      ...(await this.findOne(id)),
      ...updateSuperpowerDto,
    });
  }

  async remove(id: string) {
    return await this.superPowersRepository.remove(await this.findOne(id));
  }
}
