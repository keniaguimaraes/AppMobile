import {Injectable} from '@angular/core';

/*
  Generated class for the MovieProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
let config_key_name = "config";

@Injectable()
export class ConfigProvider {

  private config = {
    showSlide: false,
    name: "",
    userName: ""
  }

  constructor() {
  }

  //Recupera os dados do localStorage
  public getConfigData(): any {
    return localStorage.getItem(config_key_name);
  }

  //Grava os dados do localStorage
  // Parâmetro com ? = significa que é o parâmetro é opcional
  public setConfigData(showSlide?: boolean, name?: string, userName?: string) {
    let config = {
      showSlide: false,
      name: "",
      userName: ""
    }

    //atualiza showSlide
    if (showSlide) {
      //grava showSlide
      config.showSlide = showSlide;
    }
    //atualiza name
    if (name) {
      //grava name
      config.name = name;
    }
    //atualiza userName
    if (userName) {
      //grava userName
      config.userName = userName;
    }

    //Gravando o config
    localStorage.setItem(config_key_name, JSON.stringify(config));

  }

}
