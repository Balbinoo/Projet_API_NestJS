import {
  Controller,
  Get,
  Body,
  Post,
  Query,
  Param,
  Delete,
} from '@nestjs/common';
import type { Oeuvre } from './Oeuvre';
import { OeuvreService } from './oeuvres.service';

@Controller()
export class OeuvreController {
  constructor(private readonly oeuvreService: OeuvreService) {}

  // Add a new oeuvre
  @Post()
  createOeuvre(@Body() oeuvre: Oeuvre): Oeuvre {
    this.oeuvreService.addOeuvre(oeuvre);
    return this.oeuvreService.getOeuvre(oeuvre.id_oeuvre);
  }

  // Get all oeuvres
  @Get()
  getAllOeuvres(): Oeuvre[] {
    return this.oeuvreService.getAllOeuvres();
  }
  
    // Get a single oeuvre by it's id
    @Get('oeuvre/:id_oeuvre') 
    getOeuvre(@Param('id_oeuvre') id_oeuvre: string): Oeuvre {
      return this.oeuvreService.getOeuvre(id_oeuvre);
    }
  
    // Get oeuvres by the exposition's id
    @Get('exposition/:id_exposition') 
    getOeuvresByExposition(@Param('id_exposition') id_exposition: string): Oeuvre[] {
      return this.oeuvreService.getOeuvresOf(id_exposition);
    }

    // Delete oeuvres by the id_oeuvre
    @Delete('delete/:id_oeuvre')
    deleteOeuvre(@Param('id_oeuvre') id_oeuvre: string): void {
      this.oeuvreService.remove(id_oeuvre);
    }
  
}
