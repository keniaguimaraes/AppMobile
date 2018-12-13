import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";

/**
 * Generated class for the MovieDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-movie-details',
  templateUrl: 'movie-details.html',
})
export class MovieDetailsPage {

  public movies;
  public id_movie;
  private base_url: String = "https://api.themoviedb.org/3";
  private api_key: String = "2e3c87513c2287bea91b39e4d6033243";
  public loader;
  public refresher;
  public isRefreshing: boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http: HttpClient,
              public loadingCtrl: LoadingController) {
  }

  //método de inicialização da página
  ionViewDidEnter() {
    console.log('ionViewDidLoad MovieDetailsPage');
    this.id_movie = this.navParams.get("id");
    console.log("id movie received: " + this.id_movie);
    this.getDetailMovie(this.id_movie);
  }


  public getDetailMovie(id_movie) {
    this.presentLoading();
    console.log("method getDetaisMovie " + id_movie);

    this.http.get(this.base_url + `/movie/${id_movie}?api_key=` + this.api_key).subscribe(data => {
        let response = (data as any);
        this.movies = JSON.parse(JSON.stringify(response || null));
        this.closeLoading();
        this.completeRefresher();
      },
      error => {
        console
          .log(error);
        this.closeLoading();
        this.completeRefresher();

      }
    );
  }

  //função para carregar os filmes de acordo com o tempo de resposta do servidor.
  public presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    this.loader.present();
  }

  public closeLoading() {
    this.loader.dismiss();
  }

  public completeRefresher() {
    if (this.isRefreshing) {
      this.refresher.complete();
      this.isRefreshing = false;
    }
  }

  //método inicial que faz o refresh na página de filmes
  public doRefresh(refresher) {
    this.refresher = refresher;
    console.log('Begin async operation', refresher);
    this.isRefreshing = true;
    this.getDetailMovie(this.id_movie);
  }

}
