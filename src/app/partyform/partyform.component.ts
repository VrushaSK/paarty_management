import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../service.service'
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-partyform',
  templateUrl: './partyform.component.html',
  styleUrl: './partyform.component.css'
})
export class PartyformComponent implements OnInit , OnChanges{

  constructor(private fb: FormBuilder , private partyService : ServiceService ,private http : HttpClient , private router : Router){
     // Initialize the form
     this.partyForm = this.fb.group({
      name: ['', Validators.required],
      date: ['', Validators.required]
    });
  }
  ngOnInit(){
    this.isEditMode = false;
    console.log(this.partyForm.value,this.partyForm.value.typeOf)
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
    }
  )
  console.log("did it");
  }
}



}
