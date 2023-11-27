import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Client } from '../models/Client';
import { CampaignService } from '../services/campaignService/campaign.service';
import { ClientService } from '../services/clientService/client.service';

@Component({
  selector: 'app-campaign-targets',
  templateUrl: './campaign-targets.component.html',
  styleUrls: ['./campaign-targets.component.css']
})
export class CampaignTargetsComponent implements OnInit {
  client:any={}
  targetClients:Client[]=[]
  criteria=""
  selectedGender=""
  minAge=0
  maxAge=0
  selectedCountry=""
  campaignId: number =0;
  campaign:any={}

  constructor(private campaignService:CampaignService,private clientService:ClientService,private route:ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params && params['id']) {
        this.campaignId = params['id']
        this.getCampaignById() 
      }
    });
  }
  getClientById(id:number){
    this.clientService.getClientById(id).subscribe(
      (response)=>this.client=response,
      (error:HttpErrorResponse)=> alert(error.message)
    )
  }
  getCampaignById(){
    this.campaignService.getCampaignById(this.campaignId).subscribe(
      (response)=>this.campaign=response,
      (error:HttpErrorResponse)=> alert(error.message)
    )
  }
  getClientByGender(){
    this.clientService.getClientByGender(this.selectedGender).subscribe(
      (response)=>this.targetClients=response,
      (error:HttpErrorResponse)=> alert(error.message)
    )
  }
  getClientByCountry(){
    this.clientService.getClientByCountry(this.selectedCountry).subscribe(
      (response)=>this.targetClients=response,
      (error:HttpErrorResponse)=> alert(error.message)
    ) //crunge de poulet ané
  }
  getClientByAgeScale(){
    this.clientService.getClientByAgeScale(this.maxAge,this.minAge).subscribe(
      (response)=>this.targetClients=response,
      (error:HttpErrorResponse)=> alert(error.message)
    )
  }
  applyFilters() {
    if (this.criteria === 'gender') {
      this.getClientByGender();
    } else if (this.criteria === 'age') {
      this.getClientByAgeScale();
    } else if (this.criteria === 'country') {
      this.getClientByCountry();
    }
    // You can add more conditions for other filter types
  }
  addClientsToCampaign() {
    if (this.campaignId && this.targetClients.length > 0) {
      // Call your service method to add clients to the campaign
      this.campaignService.addClients(this.campaignId, this.targetClients).subscribe(
        (response) => {
          console.log('Clients added to campaign:', response);
        },
        (error: HttpErrorResponse) => {
          console.error('Error adding clients:', error);
        }
      );
    }
  }
}
