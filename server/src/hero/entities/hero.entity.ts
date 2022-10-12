import { SuperPower } from './../../superpower/entities/superpower.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Image } from '../../images/entities/image.entity';
import { IsString, MinLength } from 'class-validator';

@Entity()
export class Hero {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @IsString({ message: 'Should be string' })
  @MinLength(3, { message: 'Should be more than 2 characters' })
  @Column()
  realName: string;

  @Column()
  @IsString({ message: 'Should be string' })
  @MinLength(3, { message: 'Should be more than 2 characters' })
  nickName: string;

  @Column({ nullable: true })
  @IsString({ message: 'Should be string' })
  @MinLength(3, { message: 'Should be more than 2 characters' })
  originDescription: string;

  @Column({ nullable: true })
  @IsString({ message: 'Should be string' })
  @MinLength(21, { message: 'Should be more than 20 characters' })
  catchPhrase: string;

  @OneToMany(() => Image, (image) => image.hero, {
    nullable: true,
    cascade: true,
  })
  images: Image[];

  @ManyToMany(() => SuperPower, (superPower) => superPower.heroes, {
    cascade: true,
  })
  @JoinTable()
  superPowers: SuperPower[];
}
