import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Hero } from '../../hero/entities/hero.entity';

@Entity()
export class SuperPower {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  description: string;
  @ManyToMany(() => Hero, (hero) => hero.superPowers)
  heroes: Hero[];
}
