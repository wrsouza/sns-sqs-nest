import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/send-message')
  sendMessage(@Body() request: any): Promise<any> {
    return this.appService.sendMessage(request);
  }
}
