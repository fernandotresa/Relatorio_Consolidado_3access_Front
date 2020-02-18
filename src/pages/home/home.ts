import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController, LoadingController  } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { LocaleDataIndex } from '@angular/common/src/i18n/locale_data';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  allData: Observable<any>;

  searchTerm: string = '';  
  allDataArray: any = []

  dataSelecionada: string = ""
  dataSelecionadaFinal: string = "" 
  
  databasesSelecteds: any
  allDatabases: any = []

  address: string = "http://3.212.93.86:8085"

  constructor(
    public alertCtrl: AlertController,     
    public navCtrl: NavController, 
    public platform: Platform,  
    public http: HttpClient,
    public loadingCtrl: LoadingController,
    private iab: InAppBrowser,
    public navParams: NavParams) {

    
      this.allDatabases = [
        "aguapei",
        "anchieta",
        "carlosbotelho",
        "cavernadodiabo",
        "itatins",
        "itingucu",
        "morrododiabo",
        "pesm_caminhosdomar",
        "pesm_caraguatatuba",
        "pesm_cunha",
        "pesm_picinguaba",
        "pesm_santavirginia",
        "petar_caboclos",
        "petar_ouro_grosso",
        "petar_santana"
      ]

  }

  ionViewDidLoad() {    
   this.startInterface()                  
  } 

  startInterface(){
    this.dataSelecionada = moment().add(-1, 'month').format() 
    this.dataSelecionadaFinal = moment().format()       
    this.reload()    

  } 

  gerarRelatorio(){

    this.add().subscribe(() => {      
      
      this.reload()
      this.showAlertSuccess()
    })
   
  }  

  dataModificada(){
    console.log('Data Inicial modificada: ', this.dataSelecionada)
  }

  dataFinalModificada(){
    console.log('Data Final modificada: ', this.dataSelecionadaFinal)
  }

  add(){    
    let myData = JSON.stringify({id: 1, dataInicial: this.dataSelecionada, dataFinal: this.dataSelecionadaFinal});
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/novoRelatorio", myData, {headers: headers})
  }

  get(){    
    let myData = JSON.stringify({id: 1, dataInicial: this.dataSelecionada, dataFinal: this.dataSelecionadaFinal});
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/pegaRelatorio", myData, {headers: headers})
  }

 
  reload(){    

    let loading = this.showLoading("Gerando relatório. Favor aguarde....")
    loading.present()

    this.get().subscribe((data) => {
      console.log('Sucesso!')

      this.reloadCallback(data)
      loading.dismiss()
      
    })
  }

  reloadCallback(data){

    this.allDataArray = []
    
    data.success.forEach(element => {
     
      element.datetime = moment(element.datetime).format("DD/MM/YYYY hh:mm:ss")
      element.dataInicial = moment(element.dataInicial).format("DD/MM/YYYY")
      element.dataFinal = moment(element.dataFinal).format("DD/MM/YYYY")

      this.allDataArray.push(element)
      console.log(element)
    });
  }
   
  abrir(data){
    this.iab.create(data.filename);
  }

  showAlertSuccess(){
    let alert = this.showAlert("Sucesso", "Operação realizada com sucesso!")
      
    return alert.present()
    .then( () => {
      setTimeout(function(){
        alert.dismiss();
      }, 3000);        
    })
  }

  showAlert(title_: string, subtitle_: string) {
    
    let alert = this.alertCtrl.create({
      title: title_,
      subTitle: subtitle_,
      
      enableBackdropDismiss: false,
      buttons: ['OK']
    });
    
    return alert
  }

  showLoading(title: string){
    let loading = this.loadingCtrl.create({
      content: title
    });

    return loading
  }

  
  

}
