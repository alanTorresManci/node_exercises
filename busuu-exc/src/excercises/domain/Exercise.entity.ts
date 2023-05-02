import { User } from "../../users/domain/User.entity";
export class Exercise {
  id?: string;
  user_id: string;
  content: string;
  created_at?: string;
  user?: User;
  constructor(user_id: string, content: string, numberUserExcercises: number){
    if (content.length > 100) {
      throw new Error('Exercise content too long');
    }
    if (numberUserExcercises >= 10) {
      throw new Error('User already has 10 exercises');
    }
    this.content = content;
    this.user_id = user_id;
  }
}
  