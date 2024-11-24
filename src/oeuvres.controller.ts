import {
  Controller,
  Get,
  Query,
} from '@nestjs/common';
import type { Oeuvre } from './Oeuvre';
import { OeuvreService } from './oeuvres.service';

@Controller('/oeuvres')
export class OeuvreController {
  constructor(private readonly oeuvreService: OeuvreService) {}

  @Get()
  getOeuvres(@Query('all') id_exposition: string): Oeuvre[] {
    return this.oeuvreService.getAllOeuvres();
  }


}
