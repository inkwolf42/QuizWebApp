import {
    Calculator,
    Book,
    Brain,
    FlaskConical,
    Globe,
    Code,
    Music,
    Gamepad2,
    Atom,
    Laptop,
    Cpu,
    Palette,
    History,
    Languages,
    Landmark,
    BookOpen,
    GraduationCap,
    FileText,
    Microscope,
    Telescope,
    Dna,
    HeartPulse,
    Stethoscope,
    Activity,
    Lightbulb,
    Wrench,
    Hammer,
    Settings,
    Shield,
    Lock,
    Key,
    Terminal,
    Database,
    Server,
    Cloud,
    Smartphone,
    Monitor,
    Camera,
    Image,
    Film,
    Headphones,
    Radio,
    Trophy,
    Medal,
    Target,
    Flag,
    Map,
    Compass,
    Rocket,
    Plane,
    Ship,
    HelpCircle,
    LucideIcon
} from "lucide-react";

export interface iconValue{
    name:string,
    icon:LucideIcon
}

export const iconList:Array<iconValue> = [
    { name: "calculator", icon: Calculator },
    { name: "book", icon: Book },
    { name: "brain", icon: Brain },
    { name: "flask", icon: FlaskConical },
    { name: "globe", icon: Globe },
    { name: "code", icon: Code },
    { name: "music", icon: Music },
    { name: "gamepad", icon: Gamepad2 },
    { name: "atom", icon: Atom },
    { name: "laptop", icon: Laptop },

    { name: "cpu", icon: Cpu },
    { name: "palette", icon: Palette },
    { name: "history", icon: History },
    { name: "languages", icon: Languages },
    { name: "landmark", icon: Landmark },
    { name: "book-open", icon: BookOpen },
    { name: "graduation", icon: GraduationCap },
    { name: "file-text", icon: FileText },
    { name: "microscope", icon: Microscope },
    { name: "telescope", icon: Telescope },

    { name: "dna", icon: Dna },
    { name: "health", icon: HeartPulse },
    { name: "stethoscope", icon: Stethoscope },
    { name: "activity", icon: Activity },
    { name: "idea", icon: Lightbulb },
    { name: "wrench", icon: Wrench },
    { name: "hammer", icon: Hammer },
    { name: "settings", icon: Settings },
    { name: "security", icon: Shield },
    { name: "lock", icon: Lock },

    { name: "key", icon: Key },
    { name: "terminal", icon: Terminal },
    { name: "database", icon: Database },
    { name: "server", icon: Server },
    { name: "cloud", icon: Cloud },
    { name: "phone", icon: Smartphone },
    { name: "monitor", icon: Monitor },
    { name: "camera", icon: Camera },
    { name: "image", icon: Image },
    { name: "film", icon: Film },

    { name: "headphones", icon: Headphones },
    { name: "radio", icon: Radio },
    { name: "trophy", icon: Trophy },
    { name: "medal", icon: Medal },
    { name: "target", icon: Target },
    { name: "flag", icon: Flag },
    { name: "map", icon: Map },
    { name: "compass", icon: Compass },
    { name: "rocket", icon: Rocket },
    { name: "plane", icon: Plane },
    { name: "ship", icon: Ship },

    { name: "help-circle", icon: HelpCircle}
];


export function getIcon(name:string) {
    const found = iconList.find(i => i.name === name);
    return found ? found.icon : HelpCircle;
}
export function getIconValue(name:string) {
    const found = iconList.find(i => i.name === name);
    return found ?? iconList[iconList.length-1];
}


