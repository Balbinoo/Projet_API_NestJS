export interface Oeuvre {
  id_exposition: string;
  id_oeuvre: string;
  titre: string;
  annee: string;
  dimension: string;
  matiere: string;
  collection: string;
  texte_presentation: string;
  emplacement: string;
  photo_nomfichier: string;
  photo_auteur: string;
  oeuvre_repere_maps: string;
  geo_point_2d: {
    lon: number;
    lat: number;
  } | null;
  photo_url2: string;
};
