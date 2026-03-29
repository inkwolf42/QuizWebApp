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

export interface QuizIF{
    id:number
    question:string
    difficulty:string
    has_multi_answer:boolean
    attampted:boolean
    choices:Array<ChoiceIF>
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
