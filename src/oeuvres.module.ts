import { Module } from '@nestjs/common';
import { OeuvreController } from './oeuvres.controller';
import { OeuvreService } from './oeuvres.service';
import {HttpModule} from "@nestjs/axios";

@Module({
  imports: [HttpModule],
  controllers: [OeuvreController],
  providers: [OeuvreService],
})
export class OeuvreModule {}
