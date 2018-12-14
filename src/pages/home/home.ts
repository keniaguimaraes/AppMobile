import { Component, ViewChild } from '@angular/core';
import { NavController,LoadingController,NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import {MovieProvider} from "../../providers/movie/movie";
import {HttpClient} from "@angular/common/http";
import {MovieDetailsPage} from "../movie-details/movie-details";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [
                MovieProvider
  ]
})
export class HomePage {
  public user: any;
  @ViewChild('usuario') email;
  @ViewChild('senha') password;
  public object_feed = {
    //name: "kenia guimaraes",
    //date: "May 2, 2018",
    //description: "Estou criando um app ionic.",
    qtd_likes: 14,
    qtd_comment: 4,
  }

  public base_url: String = "https://api.themoviedb.org/3";
  public api_key: String = "2e3c87513c2287bea91b39e4d6033243";
  public list_movie = new Array<any>();
  public list_movie_sugestion = new Array<any>();
  public loader;
  public refresher;
  public isRefreshing: boolean = false;
  public page = 1;
  public infiniteScroll;


  constructor(public navCtrl: NavController,
              public toastCtrl: ToastController,
              public firebaseauth: AngularFireAuth,
              public navParams: NavParams,
              public http: HttpClient,
              public loadingCtrl: LoadingController) {
              firebaseauth.user.subscribe((data) => {
              this.user = data;
      });     
  }


//metodo ionViewDidLoad carrega a página uma vez.
  //método ionViewDidEnter a página sempre será carregada quando for acessada.
  public ionViewDidEnter() {
    this.getLatestMovies(this.page);
  }

  //função para carregar os filmes de acordo com o tempo de resposta do servidor.
  public presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Aguarde...",
    });
    this.loader.present();
  }

  public closeLoading() {
    this.loader.dismiss();
  }


  //pega os ultimos filmes
  public getLatestMovies(page = 1, new_page: boolean = false) {
    this.presentLoading();
    //para adicionar um valor(page) na url usa aspas ``.
    this.http.get(this.base_url + '/movie/popular?page=${page}&api_key=' + this.api_key).subscribe(data => {
        const response = (data as any);
        const object_return = JSON.parse(JSON.stringify(response || null));
        if (new_page) {
          this.list_movie = this.list_movie.concat(object_return.results);
          this.infiniteScroll.complete();
         // console.log(this.list_movie);
          //console.log("page: " + this.page);
        } else {
          this.list_movie = object_return.results;
        }
        //console.log(object_return);
        console.log(this.list_movie);
        this.closeLoading();
        this.completeRefresher();
      },
      error => {
       // console
        //  .log(error);
        this.closeLoading();
        this.completeRefresher();

      }
    );
  }


  public getSugestion(page = 1, new_page: boolean = false, id_movie:number ){
    this.http.get(this.base_url + '/movie/'+id_movie.toString+'/similar?page=${page}&api_key=' + this.api_key).subscribe(data => {
      const response = (data as any);
      const object_return = JSON.parse(JSON.stringify(response || null));
      if (new_page) {
        this.list_movie_sugestion = this.list_movie_sugestion.concat(object_return.results);
        this.infiniteScroll.complete();
        console.log(this.list_movie_sugestion);
        //console.log("page: " + this.page);
      } else {
        this.list_movie_sugestion = object_return.results;
      }
      //console.log(object_return);
      console.log(this.list_movie_sugestion);
      this.closeLoading();
      this.completeRefresher();
    },
    error => {
     // console
      //  .log(error);
      this.closeLoading();
      this.completeRefresher();

    }
  );

  }
  //método inicial que faz o refresh na página de filmes
  public doRefresh(refresher) {
    this.refresher = refresher;
    this.isRefreshing = true;
    this.getLatestMovies(this.page);
  }

  public completeRefresher() {
    if (this.isRefreshing) {
      this.refresher.complete();
      this.isRefreshing = false;
    }
  }

  public openDetailsMovies(movies) {

    //enviando o id do filme para a página MovieDetails.
    this.navCtrl.push(MovieDetailsPage, {id: movies.id});
    console.log("id"+movies.id);
    this.getSugestion(this.page, false,movies.id);

  }

  //método que faz o scroll para requisitar mais dados no final da tela.
  public doInfinite(infiniteScroll) {
    this.page++;
    this.infiniteScroll = infiniteScroll;
    //console.log('infinity scroll');
    this.getLatestMovies(this.page, true)


  }

  public LoginComEmail(): void {
    this.firebaseauth.auth.signInWithEmailAndPassword(this.email.value , this.password.value)
      .then(() => {
        this.exibirToast('Login Efetuado com Sucesso!');
      })
      .catch((erro: any) => {
        this.exibirToast(erro);
      });
  }

  public cadastrarUsuario(): void {
    this.firebaseauth.auth.createUserWithEmailAndPassword(this.email.value , this.password.value)
    .then(() => {
      this.exibirToast('Usuário Criado com Sucesso!');
    })
    .catch((erro: any) => {
      this.exibirToast(erro);
    });
  }

  public Sair(): void {
    this.firebaseauth.auth.signOut()
    .then(() => {
      this.exibirToast('Você Saiu.');
    })
    .catch((erro: any) => {
      this.exibirToast(erro);
    });
  }

  //mostrar o tost
  private exibirToast(mensagem: string): void {
    let toast = this.toastCtrl.create({duration: 3000, position: 'botton'});
    toast.setMessage(mensagem);
    toast.present();
  }

}
