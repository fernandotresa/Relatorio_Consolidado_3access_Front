import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController, LoadingController  } from 'ionic-angular';


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

  address: string = "http://localhost:8085"

  constructor(
    public alertCtrl: AlertController,     
    public navCtrl: NavController, 
    public platform: Platform,  
    public http: HttpClient,
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
      console.log('Sucesso!')
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

 
  }

  reloadCallback(data){

    this.allDataArray = []
    
    data.forEach(element => {

      let val = element.payload.val()
      val.key = element.payload.key
      val.dataInicial = moment(val.dataInicial).format("DD/MM/YYYY")
      val.dataFinal = moment(val.dataFinal).format("DD/MM/YYYY")

      this.allDataArray.push(val)
      console.log(val)
    });
  }
   
  abrir(data){
    console.log(data)
  }
  
  

}
