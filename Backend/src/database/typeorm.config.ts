import { join } from 'node:path';
import { NguoiDungEntity } from '../Api/Auth/entities/nguoi-dung.entity';
import { MaXacThucEntity } from '../Api/Auth/entities/ma-xac-thuc.entity';
import { PhienDangNhapEntity } from '../Api/Auth/entities/phien-dang-nhap.entity';
import type { TypeOrmModuleOptions } from '@nestjs/typeorm';
import type { DataSourceOptions } from 'typeorm';

export function getTypeOrmConfig(): TypeOrmModuleOptions & DataSourceOptions {
  return {
    type: 'mysql',
    host: process.env.DB_HOST ?? '127.0.0.1',
    port: Number(process.env.DB_PORT ?? 3306),
    username: process.env.DB_USERNAME ?? 'root',
    password: process.env.DB_PASSWORD ?? '',
    database: process.env.DB_DATABASE ?? 'dishnet',
    entities: [NguoiDungEntity, MaXacThucEntity, PhienDangNhapEntity],
    migrations: [join(__dirname, 'migrations', '*{.ts,.js}')],
    synchronize: false,
    autoLoadEntities: true,
  };
}
