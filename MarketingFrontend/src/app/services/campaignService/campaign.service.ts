import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Campaign } from 'src/app/models/Campaign';
import { Client } from 'src/app/models/Client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  apiBaseUrl=environment.apiBaseUrl

  constructor(private http:HttpClient) { }
  getCampaigns(){
    return this.http.get<Campaign[]>(`${this.apiBaseUrl}/api/campaign/all`)
  }
  getCampaignById(id:number){
    return this.http.get<Campaign>(`${this.apiBaseUrl}/api/campaign/find/${id}`)
  }
  LaunchCampaign(id:number){
    return this.http.post<Campaign>(`${this.apiBaseUrl}/api/campaign/${id}/launch`,{})
  }
  addCampaign(campaign:Campaign){
    return this.http.post<Campaign>(`${this.apiBaseUrl}/api/campaign/add`,campaign)
  }
  addClients(id:number,clients:Client[]){
    return this.http.post<Campaign>(`${this.apiBaseUrl}/api/campaign/${id}/addClients`,clients)
  }
}
