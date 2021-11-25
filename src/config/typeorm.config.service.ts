import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  
  constructor(private configService: ConfigService ) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      keepConnectionAlive: true,
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Dwin2020#',
      database: 'store',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: false,
      migrationsRun: true,
      migrationsTableName: "custom_migration_table",
      migrations: [__dirname + "migration/*.js"],
      "cli": {
        "migrationsDir": "migration"
      },
      autoLoadEntities: true,
      logging: ["query", "error"],

    
     

      // host: process.env.DB_HOST,
      // port: +process.env.DB_PORT,
      // username: process.env.DB_USERNAME,
      // password: process.env.DB_PASSWORD,
      // database: process.env.DB_DATABASE,

    };
  }
}