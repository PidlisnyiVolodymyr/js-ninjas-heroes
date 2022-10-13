import { v4 } from 'uuid';
import { CreateHeroDto } from './dto/create-hero.dto';
import { SuperPower } from './../superpower/entities/superpower.entity';
import { Image } from './../images/entities/image.entity';
import { ImagesService } from './../images/images.service';
import { SuperpowerService } from './../superpower/superpower.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hero } from './entities/hero.entity';
import { HeroService } from './hero.service';

describe('Hero Service Test', () => {
  let heroService: HeroService;
  let heroesRepository: Repository<Hero>;

  const HERO_REPOSITORY_TOKEN = getRepositoryToken(Hero);
  const IMAGE_REPOSITORY_TOKEN = getRepositoryToken(Image);
  const SUPERPOWER_REPOSITORY_TOKEN = getRepositoryToken(SuperPower);

  beforeEach(async () => {
    // const imageModule: TestingModule = await Test.createTestingModule({
    //   providers: [
    //     ImagesService,
    //     {
    //       provide: IMAGE_REPOSITORY_TOKEN,
    //       useValue: {
    //         create: jest.fn(),
    //         findAll: jest.fn(),
    //         findOne: jest.fn(),
    //       },
    //     },
    //   ],
    //   exports: [ImagesService],
    // }).compile();

    const fakeImageModule = {
      module: class fakeImageModule {},
      providers: [
        {
          provide: ImagesService,
          useValue: {
            createFile: jest.fn(),
            createDirectory: jest.fn(),
            deleteFileByName: jest.fn(),
            saveFile: jest.fn(),
            deleteFolderWithFiles: jest.fn(),
            deleteFolder: jest.fn(),
          },
        },
      ],
      exports: [ImagesService],
    };
    const fakeSuperPowersModule = {
      module: class fakeSuperPowersModule {},
      providers: [
        {
          provide: SuperpowerService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
      exports: [SuperpowerService],
    };
    const module: TestingModule = await Test.createTestingModule({
      imports: [fakeImageModule, fakeSuperPowersModule],
      providers: [
        HeroService,
        {
          provide: HERO_REPOSITORY_TOKEN,
          useValue: {
            create: jest.fn((dto: CreateHeroDto) => ({ ...dto, id: v4() })),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    heroService = module.get<HeroService>(HeroService);
    heroesRepository = module.get<Repository<Hero>>(HERO_REPOSITORY_TOKEN);
  });

  it('heroService should be defined', () => {
    expect(heroService).toBeDefined();
  });

  it('heroRepository should be defined', () => {
    expect(heroService).toBeDefined();
  });

  // it('Should create Hero', async () => {
  //   expect(
  //     await heroService.create({
  //       nickName: 'Mock',
  //       realName: 'Mock',
  //       catchPhrase: 'Mock',
  //       originDescription: 'Mock',
  //       superPowersIds: [],
  //       images: [],
  //     }),
  //   ).toEqual({
  //     id: expect.any(String),
  //     nickName: '',
  //     realName: '',
  //     catchPhrase: '',
  //     originDescription: '',
  //     superPowersIds: [],
  //     images: [],
  //   });
  // });
});
