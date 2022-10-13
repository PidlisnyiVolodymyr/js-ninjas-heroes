import { Hero } from './../src/hero/entities/hero.entity';
import { DataSource, Repository, Connection } from 'typeorm';
import { newDb, DataType } from 'pg-mem';
import { v4 } from 'uuid';
import { Image } from '../src/images/entities/image.entity';
import { SuperPower } from '../src/superpower/entities/superpower.entity';

export const setupDataSource = async () => {
  const db = newDb({
    autoCreateForeignKeyIndices: true,
  });

  db.public.registerFunction({
    implementation: () => 'test',
    name: 'current_database',
  });

  db.registerExtension('uuid-ossp', (schema) => {
    schema.registerFunction({
      name: 'uuid_generate_v4',
      returns: DataType.uuid,
      implementation: v4,
      impure: true,
    });
  });

  const ds: DataSource = await db.adapters.createTypeormDataSource({
    type: 'postgres',
    entities: [Hero, Image, SuperPower],
  });
  await ds.initialize();
  await ds.synchronize();

  return ds;
};
