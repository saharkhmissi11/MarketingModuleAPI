import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../models/Client';
import { CampaignService } from '../services/campaignService/campaign.service';
import { ClientService } from '../services/clientService/client.service';
import { NgForm } from '@angular/forms';
import { QuestionnaireService } from '../services/questionnaireService/questionnaire.service';
import { Questionnaire } from '../models/Questionnaire';
import { Question } from '../models/Question';
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
  questionnaire: Questionnaire = {
    id: 0,
    title: '',
    description: '',
    questions: [],
    campaign_id: 0
  };
  questionsQ:Question[]=[]
  questions: { text: string, options: string[], showAddOption: boolean }[] = [];
  newQuestionText = "";
  newOptionText = '';
  constructor(private questionnaireService:QuestionnaireService, private campaignService:CampaignService,private clientService:ClientService,private route:ActivatedRoute,private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params && params['id']) {
        this.campaignId = params['id']
        this.getCampaignById() 
      }
    });
  }
  
  addQuestion() {
    if (this.newQuestionText.trim() !== '') {
      this.questions.push({ text: this.newQuestionText, options: [], showAddOption: false });
      this.newQuestionText = '';
    }
    console.log("this :",this.questions)
  }

  toggleAddOption(questionIndex: number) {
    this.questions[questionIndex].showAddOption = !this.questions[questionIndex].showAddOption;
  }

  addOption(questionIndex: number) {
    if (this.newOptionText.trim() !== '') {
      this.questions[questionIndex].options.push(this.newOptionText);
      this.newOptionText = '';
      this.questions[questionIndex].showAddOption = false;
    }
    console.log("this :",this.questions)
  }
  addQuestionnaire() {
    this.questionnaire.campaign_id = this.campaignId;

    // Set the questions from the UI into the questionnaire
    this.questionnaire.questions = this.questions.map(q => ({
      id: 0,
      questionText: q.text,
      options: q.options,
      questionnaire_id: 0
    }));


    // Call the service method to add the questionnaire
    this.questionnaireService.addQuestionnaire(this.questionnaire).subscribe(
      (result) => {
        // Handle success - maybe show a message or redirect
        console.log('Questionnaire added successfully!', result);
      },
      (error) => {
        // Handle error - display an error message or handle as needed
        console.error('Error adding questionnaire:', error);
      }
    );
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
          this.router.navigate(['/campaigns'])
        },
        (error: HttpErrorResponse) => {
          console.error('Error adding clients:', error);
        }
      );
    }
  }
  
  
}
