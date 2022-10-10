import { ImagesService } from './../images/images.service';
import {
  HttpException,
  Injectable,
  HttpStatus,
  Inject,
  UploadedFiles,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsRelations, Repository } from 'typeorm';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { Hero } from './entities/hero.entity';
import { SuperpowerService } from '../superpower/superpower.service';
import { resolve } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Image } from '../images/entities/image.entity';

@Injectable()
export class HeroService {
  constructor(
    @InjectRepository(Hero)
    private readonly heroesRepository: Repository<Hero>,
    @Inject(SuperpowerService)
    private readonly superPowersService: SuperpowerService,
    @Inject(ImagesService)
    private readonly imagesService: ImagesService,
  ) {}

  async create(createHeroDto: CreateHeroDto) {
    const { superPowersIds, ...heroData } = createHeroDto;
    const heroCandidate = await this.findOneByName(heroData.nickName, {
      superPowers: true,
    });
    const superPowers = [];
    console.log('HERO: ', heroData);

    if (heroCandidate) {
      throw new HttpException(
        'Hero with that name is already exist',
        HttpStatus.CONFLICT,
      );
    }

    for (const id of superPowersIds) {
      superPowers.push(await this.superPowersService.findOne(id));
    }

    return await this.heroesRepository.save({
      ...heroData,
      superPowers,
    });
  }

  async findAll() {
    return await this.heroesRepository.find({
      relations: {
        images: true,
        superPowers: true,
      },
    });
  }

  async findOneById(id: string, relations?: FindOptionsRelations<Hero>) {
    return await this.heroesRepository
      .findOne({
        where: { id },
        relations,
      })
      .catch(() => {
        throw new HttpException('Hero not found', HttpStatus.NOT_FOUND);
      });
  }

  async update(id: string, updateHeroDto: UpdateHeroDto) {
    if (updateHeroDto.superPowersIds) {
      updateHeroDto.superPowersIds.forEach((superPower) => {
        this.superPowersService.findAll();
      });
    }
    return await this.heroesRepository.save({
      ...(await this.findOneById(id)),
      ...updateHeroDto,
    });
  }

  async remove(id: string) {
    const hero = await this.findOneById(id);
    this.imagesService.deleteFolderWithFiles(
      resolve('static', 'images', hero.id),
    );
    return await this.heroesRepository.remove(hero);
  }

  async uploadHeroImages(heroId: string, files: Express.Multer.File[]) {
    const hero = await this.findOneById(heroId, { images: true });
    const directoryPath = resolve('static', 'images', heroId);
    const heroImages = [] as Image[];
    for (const file of files) {
      heroImages.push(this.imagesService.createFile(directoryPath, file));
    }

    const images = [...hero.images, ...heroImages] as Image[];
    return await this.heroesRepository.save({ ...hero, images });
  }

  async findOneByName(
    nickName: string,
    relations?: FindOptionsRelations<Hero>,
  ) {
    return await this.heroesRepository.findOne({
      where: { nickName },
      relations,
    });
  }
}
