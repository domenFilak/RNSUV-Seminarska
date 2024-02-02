import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Worker } from '../../model/worker';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AdminDataService {

  dataUrl : string = "http://localhost:3001/admin/worker"; //povezava na nas backend

  constructor(private http : HttpClient) { }


  addWorker(workerObj : Worker) {

    return this.http.post(this.dataUrl, workerObj, {responseType: 'text'}); //na ta dani url posljemo workerObj preko http klica
  }

  getAllWorkers() : Observable<Worker[]> {
    return this.http.get<Worker[]>(this.dataUrl);
  }

  updateWorker(worker: Worker){
    
    return this.http.put(this.dataUrl + "/" + worker._id, worker, {responseType: 'text'});
  }

  deleteWorker(id: string) {
    return this.http.delete(this.dataUrl + "/" + id, {responseType: 'text'});//na ta dani url posljemo kateri id bomo zbrisali, rabimo responseType: text ker nam to vrne ob uspešnem brisanju
  }


}
