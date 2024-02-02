import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  workersData: boolean = false;
  companyData: boolean = false;
  

  constructor(private router: Router){ } //importamo za redirection

  ngOnInit(): void {
    
    this.showCompanyData();
  }

  turnOff(){ // funkcija ki nastavi vse na false, da se ne potem kje prikaze ob klicu ngIf pri dashboard
    this.workersData = false;
    this.companyData = false;
  }

  showCompanyData(){
    this.turnOff();
    this.companyData = true;
  }

  showWorkersData(){ //nastavimo parameter da pokaze komponento workers-data
    this.turnOff();
    this.workersData = true;
  }

  signOut(){
    localStorage.removeItem("token"); //zbrisemo vrednost tokena
    this.router.navigate(["admin/login"]); //redirectamo na login
  }

  

}
