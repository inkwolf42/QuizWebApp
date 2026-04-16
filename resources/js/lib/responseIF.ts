export interface UserIF{
    username:string
}

export interface CategoryIF{
    id:number
    name:string
    icon:string
    color:string
    quizzes_count?:number
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
    negative:boolean
    limitedTime:number
    startingTime:number
    quizez:Array<QuizIF>
}

export interface ResultIF{
    notAnswred:number
    correct:number
    worng:number
    score:number
    time:number
    startingTime:number
}

export interface RecordIF{
    user_name:string
    not_answred:number
    correct:number
    worng:number
    score:number
    time:number
    starting_time:number
    negative:string
    quizzes?:Array<QuizAdminIF>
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

export interface Filter{
    orderBy:string
    orderDirection:'asc'|'desc'
    search?:string
    category?:Array<string>
}


