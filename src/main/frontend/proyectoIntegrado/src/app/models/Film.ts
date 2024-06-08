import {Schedule} from "./Schedule";
import {Director} from "./Director";
import {Actor} from "./Actor";
import {Genre} from "./Genre";

export interface Film {
  idFilm: number;
  title: string;
  duration: number;
  releaseDate: Date;
  sinopsis: String;
  score: number;
  photoUrl: string;
  trailer: string;
  directors: Director[];
  actors: Actor[];
  schedules: Schedule[];
  genres: Genre[];
}
