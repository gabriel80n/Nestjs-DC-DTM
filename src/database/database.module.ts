import { Global, Module } from '@nestjs/common';

import { APP_FILTER } from '@nestjs/core';
import { DatabaseFilter } from './database.filter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions_gnavlog } from './database.gnavlog.providers';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        ...dataSourceOptions_gnavlog,
      }),
    }),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: DatabaseFilter,
    },
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
