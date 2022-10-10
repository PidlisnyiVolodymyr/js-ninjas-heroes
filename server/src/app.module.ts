import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { HeroModule } from './hero/hero.module';
import { SuperpowerModule } from './superpower/superpower.module';
import { ConfigModule } from '@nestjs/config';
import { join, resolve } from 'path';
import { ImagesModule } from './images/images.module';
import { ServeStaticModule } from '@nestjs/serve-static';
console.log('ROOT', resolve('.'));

@Module({
  imports: [
    HeroModule,
    ImagesModule,
    SuperpowerModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [resolve(__dirname, '**', '*.entity.{ts,js}')],
      synchronize: true,
      autoLoadEntities: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: resolve('static'),
    }),
  ],
})
export class AppModule {}
