import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @Post('/message')
  sendMessage() {
    return this.appService.sendMessage();
  }

  @Get()
  helloWorld() {
    return 'ok';
  }
}
