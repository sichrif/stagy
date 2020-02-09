import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddLicenceComponent } from './components/add-licence/add-licence.component';
import { EditLicenceComponent } from './components/edit-licence/edit-licence.component';
import { LicencesListComponent } from './components/licences-list/licences-list.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'app-login' },
  { path: 'add-licence', component: AddLicenceComponent },
  { path: 'edit-licence/:id', component: EditLicenceComponent },
  { path: 'licences-list', component: LicencesListComponent },
  { path: 'app-login' , component: LoginComponent  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }