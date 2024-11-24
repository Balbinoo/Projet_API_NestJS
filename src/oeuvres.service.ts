import { readFile } from 'node:fs/promises';
import { HttpService } from '@nestjs/axios';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { firstValueFrom, map, tap } from 'rxjs';
import { APIOeuvre } from './APIOeuvre';
import type { Oeuvre } from './Oeuvre';

@Injectable()
export class OeuvreService implements OnModuleInit {
  private readonly logger = new Logger(OeuvreService.name);
  private readonly storage: Map<string, Oeuvre> = new Map();

  constructor(private readonly httpService: HttpService) {}

  async onModuleInit() {
    this.logger.log('Loading oeuvres from file and API');
    await Promise.all([this.loadOeuvresFromApi()]);
    this.logger.log(`${this.storage.size} oeuvres loaded`);
  }

  private async loadOeuvresFromApi() {
    await firstValueFrom(
      this.httpService
        .get<{ total_count: number; results: APIOeuvre[] }>(
          'https://data.opendatasoft.com/api/explore/v2.1/catalog/datasets/om-culture-moba-exposition-oeuvre@orleansmetropole/records?limit=20'
        )
        .pipe(
          map((response) => response.data.results), // Access the results array directly
          map((apiOeuvres) =>
            apiOeuvres.map((apiOeuvre) => ({
              id_exposition: apiOeuvre.id_exposition,
              id_oeuvre: apiOeuvre.id_oeuvre,
              titre: apiOeuvre.titre,
              annee: apiOeuvre.annee,
              dimension: apiOeuvre.dimension,
              matiere: apiOeuvre.matiere,
              collection: apiOeuvre.collection,
              texte_presentation: apiOeuvre.texte_presentation,
              emplacement: apiOeuvre.emplacement,
              photo_nomfichier: apiOeuvre.photo_nomfichier,
              photo_auteur: apiOeuvre.photo_auteur,
              oeuvre_repere_maps: apiOeuvre.oeuvre_repere_maps,
              geo_point_2d: apiOeuvre.geo_point_2d
                ? {
                    lon: apiOeuvre.geo_point_2d.lon,
                    lat: apiOeuvre.geo_point_2d.lat,
                  }
                : null,
              photo_url2: apiOeuvre.photo_url2,
            }))
          ),
          tap((oeuvres) => oeuvres.forEach((oeuvre) => this.addOeuvre(oeuvre))),
        ),
    );
  }
  

  addOeuvre(oeuvre: Oeuvre) {
    this.storage.set(oeuvre.id_oeuvre, oeuvre);
  }

  getOeuvre(id_oeuvre: string): Oeuvre {
    const oeuvre = this.storage.get(id_oeuvre);

    if (!oeuvre) {
      throw new Error(`Oeuvre with idOeuvre ${id_oeuvre} not found`);
    }

    return oeuvre;
  }

  getAllOeuvres(): Oeuvre[] {
    return Array.from(this.storage.values()).sort((a, b) =>
      a.titre.localeCompare(b.titre),
    );
  }

  getOeuvresOf(id_exposition: string): Oeuvre[] {
    return this.getAllOeuvres()
      .filter((oeuvre) => oeuvre.id_exposition === id_exposition)
      .sort((a, b) => a.titre.localeCompare(b.titre));
  }
  
  remove(idOeuvre: string) {
    this.storage.delete(idOeuvre);
  }


}
