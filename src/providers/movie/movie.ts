import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

/*
  Generated class for the MovieProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MovieProvider {
  private base_url: String = "https://api.themoviedb.org/3";
  private api_key: String = "2e3c87513c2287bea91b39e4d6033243";
  public static list_moovie: Array<Object>;

  //public list_moovie: Array<Object>;


  constructor(public http: HttpClient) {
    console.log('Hello MovieProvider Provider');
    //MovieProvider.list_moovie = new Array<Object>();
  }

  // public getLatestMovies() {
  //   this.http.get(this.base_url + "/movie/popular?api_key=" + this.api_key).subscribe(data => {
  //       //MovieProvider.list_moovie = data.results
  //     // console.log(MovieProvider.list_moovie);
  //       // this.list_moovie = data.results;
  //       //this.setlist(this.list_moovie);
  //       console.log("Movies.ts");
  //      // console.log(MovieProvider.list_moovie);
  //     },
  //     error => {
  //       console
  //         .log(error);
  //
  //     }
  //   );
  // }

  // get Param() {
  //   return MovieProvider.list_moovie;
  // }
  //
  // set Param(new_list: Array<Object>) {
  //   MovieProvider.list_moovie = new_list;
  // }


  // public setlist(new_list: Array<Object>) {
  //   this.list_moovie = new_list;
  // }
  //
  // public getList() {
  //   return this.list_moovie;
  // }

}
