export = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'dominik2104',
  database: 'shop',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false,
  dropSchema: false,
  migrationsRun: true,
  migrations: [__dirname + '/db/migrations/**/*{.ts,.js}'],
  subscribers: [__dirname + '/db/subscribers/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/db/migrations',
  },
};
