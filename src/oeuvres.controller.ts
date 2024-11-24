import {
  Controller,
  Get,
  Body,
  Post,
  Query,
  Param,
} from '@nestjs/common';
import type { Oeuvre } from './Oeuvre';
import { OeuvreService } from './oeuvres.service';

@Controller('/oeuvres')
export class OeuvreController {
  constructor(private readonly oeuvreService: OeuvreService) {}

  // Add a new oeuvre
  @Post()
  createOeuvre(@Body() oeuvre: Oeuvre): Oeuvre {
    this.oeuvreService.addOeuvre(oeuvre);
    return this.oeuvreService.getOeuvre(oeuvre.id_oeuvre);
  }

}
