import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }



  @Get()
  async getWebhookReq(@Query('email') email: string, @Query('id') id: string) {
    return this.appService.getData(email, id)
  }

  @Get('alive')
  getAlive() {
    return this.appService.getHello()
  }
}
