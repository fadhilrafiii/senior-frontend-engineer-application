export enum AnamnesisQuestionType {
  ShortText = 'ShortText',
  LongText = 'LongText',
  MultipleChoice = 'MultipleChoice',
  DateTime = 'DateTime',
}

export interface IAnamnesisFormQuestion {
  type: AnamnesisQuestionType;
  question: string;
  choices?: string[];
}

export interface IAnamnesisFormSection {
  id: string;
  name: string;
  questions: IAnamnesisFormQuestion[];
}

export interface IAnamnesisForm {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  sections: IAnamnesisFormSection[];
}

export interface IAnamnesisFormData {
  title: string;
  description: string;
  sections: IAnamnesisFormSection[];
}
