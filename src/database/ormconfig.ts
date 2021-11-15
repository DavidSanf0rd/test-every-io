import { ConnectionOptions } from "typeorm";

const connectionOptions: ConnectionOptions = {
    host: 'postgres',
    type: 'postgres',
    port: 5432,
    username: 'postgresql',
    password: '123456',
    database: 'every-io-test',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
    synchronize: false
}

export = connectionOptions;