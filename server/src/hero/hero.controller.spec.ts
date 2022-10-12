import { Test, TestingModule } from '@nestjs/testing';
import { HeroController } from './hero.controller';
import { HeroService } from './hero.service';

describe('HeroController', () => {
  let controller: HeroController;

  const mockHeroService = {
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HeroController],
      providers: [HeroService],
    })
      .overrideProvider(HeroService)
      .useValue(mockHeroService)
      .compile();

    controller = module.get<HeroController>(HeroController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Should Create a Hero', () => {
    expect(
      controller.create({
        realName: 'Batman',
        nickName: 'Bruce Wayne',
        catchPhrase: 'Money!',
        originDescription: 'Origin!',
        superPowersIds: [],
      }),
    );
  });
});
