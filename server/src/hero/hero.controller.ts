import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { HeroService } from './hero.service';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('hero/')
export class HeroController {
  constructor(private readonly heroService: HeroService) {}

  @Post()
  create(@Body() createHeroDto: CreateHeroDto) {
    return this.heroService.create(createHeroDto);
  }

  @Post(':heroId/images')
  @UseInterceptors(FilesInterceptor('files'))
  uploadHeroImages(
    @Param('heroId') heroId: string,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    console.log(heroId);

    return this.heroService.uploadHeroImages(heroId, files);
  }

  @Get(':page/:heroesPerPage')
  getPartialHeroes(
    @Param('page') page: number,
    @Param('heroesPerPage') heroesPerPage: number,
  ) {
    console.log('Page: ', page);
    console.log('heroesPerPage: ', heroesPerPage);

    return this.heroService.getPartialHeroes({
      page: +page,
      heroesPerPage: +heroesPerPage,
    });
  }

  @Get()
  findAll() {
    return this.heroService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.heroService.findOneById(id, {
      superPowers: true,
      images: true,
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHeroDto: UpdateHeroDto) {
    return this.heroService.update(id, updateHeroDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.heroService.remove(id);
  }

  @Delete('image/:name')
  deleteFile(@Param('name') name: string) {
    return this.heroService.deleteImage(name);
  }
}
