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

@Entity()
export class Hero {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  realName: string;

  @Column()
  nickName: string;

  @Column({ nullable: true })
  originDescription: string;

  @Column({ nullable: true })
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
