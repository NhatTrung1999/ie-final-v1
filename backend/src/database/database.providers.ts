import { ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize-typescript';

export const databaseProviders = [
  {
    provide: 'IE',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const sequelize = new Sequelize({
        dialect: 'mssql',
        host: configService.get('host'),
        port: configService.get('port'),
        username: configService.get('username'),
        password: configService.get('password'),
        database: configService.get('database'),
        dialectOptions: {
          options: {
            encrypt: false,
            trustServerCertificate: true,
          },
        },
      });
      return await sequelize;
    },
  },
];
