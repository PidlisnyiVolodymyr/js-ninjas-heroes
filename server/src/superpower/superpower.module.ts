import { SuperPower } from './entities/superpower.entity';
import { Module } from '@nestjs/common';
import { SuperpowerService } from './superpower.service';
import { SuperpowerController } from './superpower.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([SuperPower])],
  controllers: [SuperpowerController],
  providers: [SuperpowerService],
  exports: [SuperpowerService],
})
export class SuperpowerModule {}
