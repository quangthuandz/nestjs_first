// typeOrm.config.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm'

const config: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '123456',
  database: 'user',
  entities: ['dist/**/*.entity.js'], 
  migrations: ['dist/migrations/*.js']
};

export default config;
