import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ServiceService } from '../service.service'
import { HttpClient } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-partylist',
  templateUrl: './partylist.component.html',
  styleUrl: './partylist.component.css'
})
export class PartylistComponent implements OnInit{
parties: any =[];
showList : boolean = true;
private apiUrl ="https://ap.greatfuturetechno.com/media/Party_Management_ASSIGNMENT.postman_collection.json";


   // Method to navigate to the party form page to add a new party
   navigateToAddParty(): void {
    // this.router.navigate(['/party-form']);
    this.showList = false;
    this.showList = false;
    this.partyForm.setValue({
      name: '',
      date: ''
    });
  }
editID:string ='';
editName:string='';
 editDate! : Date;

  editParty(party:any , name :string , date : Date){
    console.log("edit" ,party);

    // this.router.navigate(['/party-form']);
    // document.getElementById('name').innerHTML = 'fds'
    this.partyService.updateEditParty();
    this.isEditMode = true;
    this.showList = false;
    this.partyForm.setValue({
      name: name,
      date: date
    });
    this.editName =name;
    this.editDate = date;
    this.editID = party;
    console.log('edit1',this.editID)
  }

  deleteParty(party:any){
    this.http.delete('https://tolearnhttp-default-rtdb.firebaseio.com/party/'+party+'.json').subscribe(
      (response)=>{
         console.log(response,"deleted ");
         this.getParties();
      }
    );

  }

  ngOnInit(){
    this.getParties();
    this.isEditMode = false;

  }

  getParties(){
    this.http.get<{ [ key : string ] : Object}>('https://tolearnhttp-default-rtdb.firebaseio.com/party.json').pipe(map((response)=>{
      console.log(response,"here is response");
      let party =[];
      for(let res in response){
        party.push({...response[res] , id:res});
      }
      console.log(party,"here is party");
      this.parties = party;
    })).subscribe((response)=>{
     console.log(response);
    })
    
  }

  constructor(private fb: FormBuilder , private partyService : ServiceService ,private http : HttpClient , private router : Router){
    // Initialize the form
    this.partyForm = this.fb.group({
     name: ['', Validators.required],
     date: ['', Validators.required]
   });
 }


 ngOnChanges() {
  this.isEditMode = this.partyService.isEdit;
  console.log("in ng on changes");
 }
 


 partyForm!: FormGroup;
 partyId! : number;
 isEditMode: boolean = this.partyService.isEdit;

 onSubmit(){
  if(!this.isEditMode){
   this.http.post('https://tolearnhttp-default-rtdb.firebaseio.com/party.json',this.partyForm.value).subscribe(
      (response)=>{
          console.log(response , "onsumbit");
            this.router.navigate(['/party-list']);
            this.showList = true;
            this.getParties();
    }) ;
    console.log("did it");
  
}
else{
  console.log("in edit",this.editID);
  this.http.put('https://tolearnhttp-default-rtdb.firebaseio.com/party/'+this.editID+'.json', this.partyForm.value).subscribe(
  (response)=>{
     console.log("edited");
     this.isEditMode = false;
     this.showList = true;
     this.getParties();
    })
    }
  }
}