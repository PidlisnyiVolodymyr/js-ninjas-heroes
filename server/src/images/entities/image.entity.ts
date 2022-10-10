import { Hero } from './../../hero/entities/hero.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Image {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column({ nullable: true })
  path: string;
  @ManyToOne(() => Hero, (hero) => hero.images, { onDelete: 'CASCADE' })
  hero: Hero;
}
