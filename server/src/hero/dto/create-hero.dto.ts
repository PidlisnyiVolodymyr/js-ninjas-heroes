export class CreateHeroDto {
  nickName: string;
  realName: string;
  originDescription: string;
  catchPhrase: string;
  superPowersIds: string[];
  images?: Express.Multer.File[];
}
