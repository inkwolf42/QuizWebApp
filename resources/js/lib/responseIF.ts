export interface UserIF{
    username:string
}

export interface CategoryIF{
    id:number
    name:string
}

export interface ChoiceIF{
    id:number
    answer:string
    selected:boolean
}

export interface ChoiceAdminIF{
    id:number
    answer:string
    is_correct:boolean
}

export interface ChoiceAdminCreateIF{
    answer:string
    is_correct:boolean
}

export interface QuizIF{
    id:number
    question:string
    difficulty:string
    has_multi_answer:boolean
    attampted:boolean
    choices:Array<ChoiceIF>
}

export interface QuizAdminIF{
    id:number
    category_id:number
    question:string
    difficulty:string
    has_multi_answer:boolean
    category:CategoryIF
    choices:Array<ChoiceAdminIF>
}

export interface GameIF{
    startingTime:number
    quizez:Array<QuizIF>
}

export interface ResultIF{
    notAnswred:number
    correct:number
    worng:number
    time:number
    startingTime:number
}

export interface Paginated<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;

    first_page_url:string;
    last_page_url:string;
    next_page_url:string;
    prev_page_url:string;

    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}
