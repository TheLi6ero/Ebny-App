export interface Question {
  id: number;
  text: string;
  options: { text: string, imageUrl?: string }[];
  correct: string;
}
