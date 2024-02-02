import { Component, OnInit} from '@angular/core';
import { AdminDataService } from '../../../service/admin-data.service';
import { Worker } from '../../../../model/worker';


@Component({
  selector: 'app-company-data',
  templateUrl: './company-data.component.html',
  styleUrl: './company-data.component.css'
})
export class CompanyDataComponent implements OnInit{

  allWorkers: Worker[] = []; //spet na novo ustvarimo tukaj in damo vse delavce noter, da jih lahko potem prestejemo v tej komponenti oz. v html prikazu

  constructor(private dataService: AdminDataService){

  }

  ngOnInit(): void {
    this.getAllWorkers();
    
  }

  getAllWorkers(){
    this.dataService.getAllWorkers().subscribe(res => { //če obstaja res potem smo dobili podatke o vseh delavcih
      console.log(res);
      this.allWorkers = res; //spremenljivki array delavcev damo tiste, katere smo pravkar prebrali iz podatkovne baze
    }, err => {
      console.log(err);
    });
  }

  get numOfRows(){
    return this.allWorkers.length;
  }

}
