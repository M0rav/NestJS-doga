import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Redirect,
  Render,
} from '@nestjs/common';
import { AppService } from './app.service';
import db from './db';
import { CreateCatDto } from './createcat.dto';
import { get } from 'http';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Render('index')
  async index(@Query('szem_szin') szem_szin: string) {
    if (szem_szin != undefined) {
      const [rows] = await db.execute('SELECT id, suly, szem_szin FROM macskak WHERE szem_szin LIKE ?', ['%' + szem_szin + '%'],);
      return { macskak: rows };
    }
    else {
      const [rows] = await db.execute('SELECT id, szem_szin, suly FROM macskak ORDER BY suly DESC');
      return { macskak: rows };
    }

  }
  @Get('cats/new')
  @Render('addcat')
  ujcica() {
    return {};
  }
  @Post('cats/new')
  @Redirect()
  async newPainting(@Body() cat: CreateCatDto) {
    const [result]: any = await db.execute(
      'INSERT INTO macskak (szem_szin, suly) VALUES (?, ?)',
      [cat.szem_szin, cat.suly]
    );
    return {
      url: '/',
    }
  }
}
