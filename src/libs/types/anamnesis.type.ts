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
  questions: IAnamnesisFormQuestion[];
}

export interface IAnamnesisForm {
  id?: string;
  title: string;
  description: string;
  createdAt: Date;
  sections: IAnamnesisFormSection[];
}
