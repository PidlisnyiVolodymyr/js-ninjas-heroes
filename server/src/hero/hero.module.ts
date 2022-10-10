import { SuperpowerModule } from './../superpower/superpower.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { HeroService } from './hero.service';
import { HeroController } from './hero.controller';
import { Hero } from './entities/hero.entity';
import { ImagesModule } from '../images/images.module';

@Module({
  imports: [TypeOrmModule.forFeature([Hero]), SuperpowerModule, ImagesModule],
  controllers: [HeroController],
  providers: [HeroService],
  exports: [HeroService],
})
export class HeroModule {}
