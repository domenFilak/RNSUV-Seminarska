import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';// importamo vrednosti iz environment datoteke
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})


export class AdminAuthService {

  hashMap: Map<string, string> = environment.hashMap; //hashmapa parov username/password iz environment

  constructor(private http : HttpClient, private router: Router) { }


  adminLogin(username: string, password: string){ //metoda za login
    if (this.hashMap.has(username)){ //ce je username v hashmapi potem obstaja, treba preverit se geslo
      if (this.hashMap.get(username) === password){ //preverimo ali je geslo pravilno glede na key(oz ustrezen username)
        console.log("Login is successful for user " + username);
        localStorage.setItem("token", (Math.random() + 1).toString(36).substring(7));
        this.router.navigate(["/admin/dashboard"]); //ce je vse ok, redirect na dashboard
      }
      else {
        alert("Login is failed. Wrong password for username " + username);
        console.log("Login is failed for user " + username + "!");
        this.router.navigate(["/admin/login"]); //ce ni ok, nazaj na login
      }
    }
    else {
      alert("Login is failed. Username " + username + " does not exist!");
    }
  }

  isAdminLoggedIn(): Boolean{
    if (localStorage.getItem("token")){
      return true;
    }
    return false;
  }





}


