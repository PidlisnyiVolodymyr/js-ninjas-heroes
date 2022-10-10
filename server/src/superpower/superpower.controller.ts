import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SuperpowerService } from './superpower.service';
import { CreateSuperpowerDto } from './dto/create-superpower.dto';
import { UpdateSuperpowerDto } from './dto/update-superpower.dto';

@Controller('superpower')
export class SuperpowerController {
  constructor(private readonly superpowerService: SuperpowerService) {}

  @Post()
  create(@Body() createSuperpowerDto: CreateSuperpowerDto) {
    return this.superpowerService.create(createSuperpowerDto);
  }

  @Get()
  findAll() {
    return this.superpowerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.superpowerService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, updateSuperpowerDto: UpdateSuperpowerDto) {
    return this.superpowerService.update(id, updateSuperpowerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.superpowerService.remove(id);
  }
}
