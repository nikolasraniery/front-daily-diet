export interface Meal {
  id?: string;
  created_at?: string;
  user_id?: string;
  name: string;
  description: string;
  in_diet: boolean;
  time: string;
}
