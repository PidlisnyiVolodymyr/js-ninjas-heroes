import { Hero } from './../../hero/entities/hero.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsString, MinLength } from 'class-validator';

@Entity()
export class Image {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsString({ message: 'Should be string' })
  @MinLength(3, { message: 'Should be more than 2 characters' })
  @Column()
  name: string;

  @IsString({ message: 'Should be string' })
  @Column({ nullable: true })
  path: string;
  @ManyToOne(() => Hero, (hero) => hero.images, { onDelete: 'CASCADE' })
  hero: Hero;
}
