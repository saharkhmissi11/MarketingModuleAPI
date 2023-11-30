import { Question } from "./Question";

export interface Questionnaire {
    id: number;
    title: string;
    description: string;
    questions: Question[];
    campaign_id: number;
  }