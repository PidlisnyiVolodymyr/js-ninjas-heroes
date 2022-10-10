import { Test, TestingModule } from '@nestjs/testing';
import { Hero } from './hero.provider';

describe('Hero', () => {
  let provider: Hero;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Hero],
    }).compile();

    provider = module.get<Hero>(Hero);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
