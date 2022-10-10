import { HeroModule } from './../hero/hero.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { Image } from './entities/image.entity';
import { ImagesController } from './images.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Image])],
  providers: [ImagesService],
  exports: [ImagesService],
  controllers: [ImagesController],
})
export class ImagesModule {}
