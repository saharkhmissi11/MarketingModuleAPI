import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Questionnaire } from 'src/app/models/Questionnaire';

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService {
  apiBaseUrl=environment.apiBaseUrl

  constructor(private http:HttpClient) { }
  addQuestionnaire(questionnaire:Questionnaire){
    return this.http.post<Questionnaire>(`${this.apiBaseUrl}/api/questionnaire/add`,questionnaire)
  }
  addResponseToQuestion(response:Response){
    return this.http.post<Response>(`${this.apiBaseUrl}/api/response/add`,response)
  }
  getQuestionnaireByCampany(id:number){
    return this.http.get<Questionnaire>(`${this.apiBaseUrl}/api/questionnaire/campaign/${id}`)
  }
}