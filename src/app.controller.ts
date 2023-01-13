import {
  Controller,
  Get,
  Query,
  Render,
} from '@nestjs/common';
import { AppService } from './app.service';
import db from './db';
import { CreateCatDto } from './createcat.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Render('index')
  async index(@Query('eye_color') szem_szin: string) {

  }
}
