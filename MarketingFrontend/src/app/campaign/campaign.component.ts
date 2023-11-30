import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Campaign } from '../models/Campaign';
import { Product } from '../models/Product';
import { CampaignService } from '../services/campaignService/campaign.service';
import { ClientService } from '../services/clientService/client.service';
import { ProductService } from '../services/productService/product.service';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css']
})
export class CampaignComponent implements OnInit {
  showForm = false
  isEditing = false
  campaign:any={}
  campaigns:Campaign[]=[]
  products:Product[]=[]
  selectedProductId=null
  isRequesting: boolean[] = Array(this.campaigns.length).fill(false);
  isLaunched: boolean[] = Array(this.campaigns.length).fill(false);

  constructor(private campaignService:CampaignService,private productService:ProductService,private clientService:ClientService,private router: Router) { }

  ngOnInit(): void {
    this.getCampaigns()
    this.getProducts()
  }
  toggleForm() {
    this.showForm = !this.showForm; // Basculez entre afficher et masquer le formulaire
  }
  CloseForm(addForm: NgForm) {
    this.toggleForm() ;
    addForm.resetForm();
  }
  toggleEditing(id:number) {
    this.isEditing = !this.isEditing;
  }
  getProducts(){
    this.productService.getProducts().subscribe(
      (response)=>this.products=response,
      (error:HttpErrorResponse)=>alert(error.message)
    );
  }
  getCampaigns(){
    this.campaignService.getCampaigns().subscribe(
      (response)=> this.campaigns=response,
      (error:HttpErrorResponse)=> alert(error.message)
    )
  }
 /* getCampaignsById(){
    this.campaignService.g().subscribe(
      (response)=> this.campaigns=response,
      (error:HttpErrorResponse)=> alert(error.message)
    )
  }*/
  addCampaign(addForm:NgForm){
    if(addForm.valid){
    this.campaignService.addCampaign(this.campaign).subscribe(
      (response) => { this.router.navigate(['/campaign-targets'], { queryParams: { id: response.id } });},
      (error:HttpErrorResponse) => alert(error.message)
    );
    }
  }
  launch(campaignId:number,index:number){
    this.isRequesting[index] = true;
    this.campaignService.LaunchCampaign(campaignId).subscribe(
      (response)=>  {this.isRequesting[index] = false;this.isLaunched[index] = true},
      (error:HttpErrorResponse)=>   this.isRequesting[index] = false
    )
    this.router.navigate(['/campaigns'])
  }

}
