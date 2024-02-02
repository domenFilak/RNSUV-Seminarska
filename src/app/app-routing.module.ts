import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin/admin.component';
import { LoginComponent } from './admin/components/login/login.component';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { AdminAuthService } from './admin/service/admin-auth.service';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  {path: 'admin', component : AdminComponent, children : [{ path: 'login', component : LoginComponent}, { path: 'dashboard', component : DashboardComponent, canActivate: [AdminGuard]}]}, //otrok route nam pokaze po admin/login
                                                                                                                                                                                            //can activate pride iz guards/AdminGuard in nam pove, ali uporabnik lahko aktivira dano komponento!!
  {path: '', redirectTo : 'admin', pathMatch : 'full'} //ce path prazen, nas redirecta na admin path => pathMatch = full je polno ujemanje url glede na localhost

    
  ]; //naslov za routing module

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
