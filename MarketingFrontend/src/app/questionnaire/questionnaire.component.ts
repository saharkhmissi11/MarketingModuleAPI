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
  userResponses: { [key: number]: string } = {};

  constructor(private questionnaireService:QuestionnaireService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.companyId = +params['companyId'];
      this.getQuestionnaireByCampaign(this.companyId)
    });
    
  }
  initializeUserResponses() {
    this.questions.forEach(question => {
      this.userResponses[question.id] = '';
    });
  }
  getQuestionnaireByCampaign(campaignId: number) {
    this.questionnaireService.getQuestionnaireByCampany(campaignId).subscribe(
      (response) => {
        this.questionnaire = response;
        this.questions = response.questions;
        // Initialize userResponses object with question IDs
        this.questions.forEach(question => {
          this.userResponses[question.id] = '';
        });
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching questionnaire:', error);
      }
    );
  }
  /*
  onSubmit() {
    Object.keys(this.userResponses).forEach(questionId => {
      const response = {
        question_id:questionId,
        answer: this.userResponses[+questionId] // Explicitly cast userResponses[questionId] as string
      };

      this.questionnaireService.addResponseToQuestion(response as Response).subscribe(
        (savedResponse) => {
          console.log('Response saved:', savedResponse);
        },
        (error) => {
          console.error('Error saving response:', error);
        }
      );
    });
  }*/
}
