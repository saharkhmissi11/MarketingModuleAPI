import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from '../models/Question';
import { QuestionnaireService } from '../services/questionnaireService/questionnaire.service';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit {
  questionnaire:any={}
  questions:Question[]=[]
  companyId: number=0;

  constructor(private questionnaireService:QuestionnaireService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.companyId = +params['companyId'];
      this.getQuestionnaireByCampaign(this.companyId)
    });
    
  }
  getQuestionnaireByCampaign(campaignId: number) {
    this.questionnaireService.getQuestionnaireByCampany(campaignId).subscribe(
      (response) => {this.questionnaire=response,this.questions=response.questions},
      (error: HttpErrorResponse) => {
        console.error('Error fetching questionnaire:', error);
      }
    );
  }

}
