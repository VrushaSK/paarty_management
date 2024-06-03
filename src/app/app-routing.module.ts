import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { PartylistComponent } from './partylist/partylist.component';
import { PartyformComponent } from './partyform/partyform.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'party-list', component: PartylistComponent },
  { path: 'party-form' , component: PartyformComponent},
  // Add more routes as needed
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route to login page
  { path: '**', redirectTo: '/login' } // Redirect to login page for any other route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
