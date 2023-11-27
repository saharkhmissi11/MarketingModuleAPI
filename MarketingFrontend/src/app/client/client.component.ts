import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Client } from '../models/Client';
import { ClientService } from '../services/clientService/client.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  clients:Client[]=[]
  client:any={}
  showForm = false;
  isEditing = false;

  constructor(private clientService:ClientService,private router:Router) { }

  ngOnInit(): void {
    this.getClients()
  }
  toggleForm() {
    this.showForm = !this.showForm; // Basculez entre afficher et masquer le formulaire
  }
  CloseForm(addForm: NgForm) {
    this.toggleForm() ;
    addForm.resetForm();
    this.router.navigate(['/clients'])
  }
  toggleEditing(id:number) {
    this.isEditing = !this.isEditing;
  }
  getClients(){
    return this.clientService.getClients().subscribe(
      (value:Client[])=>{this.clients=value},
      (error:HttpErrorResponse)=>{alert(error)}
    );
  }
  
  addClient(addForm:NgForm){
    console.log(this.client)
    if(addForm.valid){
    this.clientService.addClient(this.client).subscribe(
      (response) => console.log(response),
      (error:HttpErrorResponse) => alert(error.message)
    );
    }
    location.reload()
    this.router.navigate(["/clients"])
  }

}
