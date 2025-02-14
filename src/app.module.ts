import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ExceptionInterceptor } from './interceptors/exception.interceptor';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, PrismaService, {
    provide: APP_INTERCEPTOR,
    useClass: ExceptionInterceptor,
  },],
  exports: [PrismaService]
})
export class AppModule { }
