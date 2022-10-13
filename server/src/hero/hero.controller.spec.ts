import { CreateHeroDto } from './dto/create-hero.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { setupDataSource } from './../../test/fakeDB';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeroController } from './hero.controller';
import { HeroService } from './hero.service';
import { Test, TestingModule } from '@nestjs/testing';
import { Hero } from './entities/hero.entity';
import { Connection } from 'typeorm';

describe('Hero Controller', () => {
  let heroController: HeroController;
  let connection: Connection;

  beforeAll(async () => {
    connection = await setupDataSource();

    const heroModule: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([Hero])],
      controllers: [HeroController],
      providers: [HeroService],
    }).compile();

    heroController = heroModule.get<HeroController>(HeroController);
  });

  describe('Create Hero', () => {
    const hero: CreateHeroDto = {
      realName: 'Bruce Wayne',
      nickName: 'Batman',
      originDescription: 'Has too much money',
      catchPhrase: 'Money!',
      images: [],
      superPowersIds: [],
    };

    it('Should return the hero', async () => {
      const createdHero = await heroController.create(hero);
      expect(createdHero.nickName).toBe(hero.nickName);
    });

    it('Should return CONFLICT', async () => {
      await heroController.create(hero);
      await expect(heroController.create(hero)).rejects.toThrow(
        new HttpException(
          'Hero with that name is already exist',
          HttpStatus.CONFLICT,
        ),
      );
    });
  });
});
