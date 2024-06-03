import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  
  private apiUrl ="https://tolearnhttp-default-rtdb.firebaseio.com/Party.json";

  constructor( private http : HttpClient) { }

  isEdit = false;

  updateEditParty(){
     this.isEdit =true;
  }

}
