import { PartialType } from '@nestjs/mapped-types';
import { CreateSuperpowerDto } from './create-superpower.dto';

export class UpdateSuperpowerDto extends PartialType(CreateSuperpowerDto) {}
