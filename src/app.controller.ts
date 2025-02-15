import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }



  @Get()
  async getWebhookReq(@Query('email') email: string, @Query('id') id: string) {
    return this.appService.setData(email, id)
  }

  @Get('alive')
  getAlive() {
    return this.appService.getHello()
  }

  @Post()
  async getWebhookReqPost(@Query('email') email: string, @Query('id') id: string) {
    return this.appService.setData(email, id)
  }

  @Get('user/list')
  async getDataDB(
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
    @Query('email') email?: string,
    @Query('req_id') req_id?: string,
  ) {
    const pageNumber = Number(page) || 1
    const pageSizeNumber = Number(pageSize) || 10
    return this.appService.getDataDB(pageNumber, pageSizeNumber, {
      email,
      req_id,
    })
  }

  @Get('user/detail')
  async getUserDataDB(@Query('email') email: string) {
    return this.appService.getUserData(email)
  }

}
