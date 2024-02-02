import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminAuthService } from '../../service/admin-auth.service'; //importamo nas admin auth service - kjer imamo adminLogin metodo

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  adminLoginData = new FormGroup({
    username: new FormControl,
    password: new FormControl
  })

  constructor(private formBuilder: FormBuilder, private adminAuth: AdminAuthService){ 
    
  }

  ngOnInit(): void {
      this.adminLoginData = this.formBuilder.group({
        username : ['', [Validators.required, Validators.email]],
        password : ['', [Validators.required]]
      });
  }

  adminLogin(){
    this.adminAuth.adminLogin(this.adminLoginData.value.username, this.adminLoginData.value.password); //uporabimo metodo adminLogin iz AdminAuthService
  }

}
