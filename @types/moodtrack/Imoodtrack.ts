export interface Imoodtrack {
    mood : string,
    feeling : string
    date : any
}

export interface IMentalHealth {
    id: number;
    date: string;
    mood: string; 
    feeling: string;
    stress_level: number;
    sleep_hours: number;
    exercise_minutes: number;
    social_interaction_score: number;
    trigger: string;
    notes: string;
  };
