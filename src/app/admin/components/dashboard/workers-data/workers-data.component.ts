import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Worker } from '../../../../model/worker';
import { AdminDataService } from '../../../service/admin-data.service';


@Component({
  selector: 'app-workers-data',
  templateUrl: './workers-data.component.html',
  styleUrl: './workers-data.component.css'
})
export class WorkersDataComponent implements OnInit{

  workerDetailsForm = new FormGroup({

    _id : new FormControl(),
    name : new FormControl(),
    surname : new FormControl(),
    id : new FormControl(),
    workingPosition : new FormControl(), 
    doy : new FormControl(), 
    dob : new FormControl(), 
    email: new FormControl()

  });
  //tukaj imamo dva razlicna forma, da se ne prepletata (recimo glede na view in dodajanje novega delavca)!
  workerDetailsFormView = new FormGroup({

    _id : new FormControl(),
    name : new FormControl(),
    surname : new FormControl(),
    id : new FormControl(),
    workingPosition : new FormControl(), 
    doy : new FormControl(), 
    dob : new FormControl(), 
    email: new FormControl()

  });

  worker : Worker = { //tukaj bomo "bindali" podatke iz forme in jih nato poslali na backend
    _id : '',
    name: '',
    surname: '',
    id: '',
    workingPosition: '',
    doy: '',
    dob: '',
    email: ''
  }

  allWorkers: Worker[] = []; //prazen array, kamor bomo dali delavce iz podatkovne baze
    

  constructor(private fb: FormBuilder, private dataService: AdminDataService){

  }

  ngOnInit(): void {
    this.allWorkers = [];
    this.workerDetailsForm = this.fb.group({ //dodamo neko validacijo na nase forme
      _id : ['', [Validators.required]],
      name : ['', [Validators.required]],
      surname : ['', [Validators.required]],
      id : ['', [Validators.required]],
      workingPosition : ['', [Validators.required]], 
      doy : ['', [Validators.required]], 
      dob : ['', [Validators.required]], 
      email: ['', [Validators.required, Validators.email]]
    });

    this.workerDetailsFormView = this.fb.group({ //dodamo neko validacijo na nase forme
      _id : ['', [Validators.required]],
      name : ['', [Validators.required]],
      surname : ['', [Validators.required]],
      id : ['', [Validators.required]],
      workingPosition : ['', [Validators.required]], 
      doy : ['', [Validators.required]], 
      dob : ['', [Validators.required]], 
      email: ['', [Validators.required, Validators.email]]
    });
    this.getAllWorkers(); //dodamo metodo getAllWorkers() v init => vsakič ko se aplikacija zažene/osveži, se bodo najprej prebrali vsi delavci iz podatkovne baze
    
  }

  addNewWorker(){ //napolnimo podatke prej ustvarjenega workerja z temi iz forme
    

    this.worker.name = this.workerDetailsForm.value.name;
    this.worker.surname = this.workerDetailsForm.value.surname;
    this.worker.id = this.workerDetailsForm.value.id;
    this.worker.workingPosition = this.workerDetailsForm.value.workingPosition;
    this.worker.doy = this.workerDetailsForm.value.doy; 
    this.worker.dob = this.workerDetailsForm.value.dob;
    this.worker.email = this.workerDetailsForm.value.email;

    this.dataService.addWorker(this.worker).subscribe(res => { //pozovemo metodo addWorker iz admin-data service, kjer posljemo worker obj katerega smo napolnili z podatki iz forme
      console.log("delavec uspesno dodan!");
      
      this.ngOnInit();//znova pozovemo metodo onInit, se nam nasa forma pobrise od prej vnesenih podatkov
    }, err => {
      console.error({
        "Backend returned code: ": err.status,
        "body was: ": err.error,
        "raw error: ": err
      });
    });
    
  }

  getAllWorkers(){
    this.dataService.getAllWorkers().subscribe(res => { //če obstaja res potem smo dobili podatke o vseh delavcih
      console.log(res);
      this.allWorkers = res; //spremenljivki array delavcev damo tiste, katere smo pravkar prebrali iz podatkovne baze
    }, err => {
      console.log(err);
    });
  }

  getWorker(worker: Worker){
    
    this.workerDetailsFormView = this.fb.group({ //definiramo novo formo tipa, katero smo ustvarili zgoraj in jo napolnemo z podatki delavca, katerega zelimo pogledati
      _id: worker._id,
      name: worker.name,
      surname: worker.surname,
      id: worker.id,
      workingPosition: worker.workingPosition,
      doy: worker.doy,
      dob: worker.dob,
      email: worker.email
    });

  }

  get totalRows(): number { //za izpis, koliko vrstic ima tabela workers v mongodb
    return this.allWorkers.length;
  }

  updateWorker(){
    
    this.worker._id = this.workerDetailsFormView.value._id; //rabimo ta _id iz mongodb, da lahko po njem updatamo
    this.worker.name = this.workerDetailsFormView.value.name;
    this.worker.surname = this.workerDetailsFormView.value.surname;
    this.worker.id = this.workerDetailsFormView.value.id;
    this.worker.workingPosition = this.workerDetailsFormView.value.workingPosition;
    this.worker.doy = this.workerDetailsFormView.value.doy; 
    this.worker.dob = this.workerDetailsFormView.value.dob;
    this.worker.email = this.workerDetailsFormView.value.email;

    
    this.dataService.updateWorker(this.worker).subscribe(res => {
      console.log("worker updated successfully");
      this.ngOnInit();
    }, err => {
      console.error({
        "Backend returned code: ": err.status,
        "body was: ": err.error,
        "raw error: ": err
      });
    });
    
  }

  deleteWorker(worker: Worker){
    if (window.confirm("Are you sure you want to delete " + worker.name + "?")){
      this.dataService.deleteWorker(worker._id).subscribe(res =>{
        console.log("worker deleted success");
        this.ngOnInit();
      }, err => {
        console.log("error occured while deleting the worker");
      });
    }
  }

}
