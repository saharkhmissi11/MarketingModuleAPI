import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from 'src/app/models/Client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiBaseUrl= environment.apiBaseUrl;

  constructor(private http:HttpClient) { }

  getClients(){
    return this.http.get<Client[]>(`${this.apiBaseUrl}/api/client/all`)
  }
  getClientById(id:number){
    return this.http.get<Client>(`${this.apiBaseUrl}/api/client/find/${id}`)
  }
  getClientByGender(gender:string){
    return this.http.get<Client[]>(`${this.apiBaseUrl}/api/client/by-gender/${gender}`)
  }
  /*getClientByField(field:string){
    return this.http.get<Client[]>(`${this.apiBaseUrl}/api/by-gender/${field}`)
  }*/
  getClientByCountry(country:string){
    return this.http.get<Client[]>(`${this.apiBaseUrl}/api/client/by-country/${country}`)
  }
  getClientByAgeScale(max:number,min:number){
    return this.http.get<Client[]>(`${this.apiBaseUrl}/api/client/by-age-scale/${max}/${min}`)
  }
  addClient(client:Client){
    return this.http.post<Client>(`${this.apiBaseUrl}/api/client/add`,client)
  }
  
}
