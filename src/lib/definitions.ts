type UUID = string;

export type User = {
  id?: string | null;
  name?: string | null;
  emailVerified?: boolean | null;
  email?: string | null;
  image?: string | null;
  password?: string | null;
  info?: UserInfo | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}

export type UserInfo = {
  gender?: 'male' | 'female' | 'other' | null;
  birthdate?: string | null;
  weight?: number;
  height?: number;
  goal?: string | null;
  age?: string | null | number;
  theme: string;
  assessment: boolean;
  onboarding: boolean;
}

export type Question = {
  key: string,
  title?: string,
  shortTitle?: string,
  description?: string,
  options?: string[]
  inputs?: {
    name: string,
    type: string,
    placeholder: string,
    pattern?: string,
    inputmode?: string,
    optional: boolean
  }[]
  multiple?: [string, boolean][]
}

export type MenuNavLinks = {
  name: string,
  href: string,
  current: string[],
  Icon?: any
}

export type CalendarContent = {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  startDatetime: string;
  endDatetime: string;
  active: boolean;
}
export type CalendarDayContent = {
  day: Date;
  content: CalendarContent[];
}

export type AuthProvider = {
  id: string;
  image: string;
}

export type Providers = 'Google' | 'Facebook' | 'GitHub' | 'X';
export type AuthProviders = {
  [key in Providers]: AuthProvider
}

export type WorkoutImageLink = {
  url: string;
}

export type WorkoutImage = {
  name: string;
} & ({
  type: 'external';
  external: WorkoutImageLink;
} | {
  type: 'file';
  file: WorkoutImageLink;
})
export type Workout = {
  id?: string;
  name: string;
  description: string;
  tags: string[][];
  image_banner?: WorkoutImage[] | null;
  images?: WorkoutImage[] | null;
  instructions: string;
  warnings: string;
}

export type WorkoutComplex = {
  name: string;
  body_zone: string;
  workout_id: string;
} & WorkoutComplexParameters;

export type WorkoutComplexParameters = {
  reps: number;
  sets: number;
  time: number;
  time_unit: string;
  weight: number;
  weight_unit: string;
  total_minutes: number;
  recommendations: string;
  comments: string;
}
export type PlanDay = {
  day: number;
  plan_id: UUID;
  user_id: UUID;
  name?: string;
  percentage: number;
  completed: boolean;
  completed_at?: string;
  current_day?: boolean;
}

export type Plan = {
  id: UUID;
  name: string;
  workouts_complex: string[] | WorkoutComplex[];
  body_zones: string[];
  tags: string[][];
  days: number;
  workingDays?: PlanDay[];
  sets_per_week: number;
  custom_email?: string;
  current_day?: number;
  progress?: number;
  workouts_done?: number;
}

export type Exercise = {
  id: UUID;
  workout_id: UUID;
  name: string;
  tags: string[][];
  description: string;
  image_banner?: WorkoutImage[] | null;
  images?: WorkoutImage[] | null;
} & WorkoutComplexParameters

export type GroupsWorkout = {
  id: UUID;
  name: string;
  defaultname: string;
}

export type FilterSearchParams = {
  query?: string;
  tags?: string[];
}

export const THEMES = ['default', 'light', 'dark', 'pastel', 'cmyk'];
export const APPCOOKIES = {
  PWA: 'app.installpwa',
  ONBOARDING: 'app.onboarding',
  ACCEPTCOOKIES: 'app.acceptcookies',
  ASSESSMENT: 'app.assessment',
  THEME: 'app.theme'
};

export interface NotionTableProperties {
  [key: string]: string;
}

// Notion
export const tableWorkoutsProperties: NotionTableProperties = {
  // ID: "idbd",
  Nombre_es: "name_es",
  Nombre_en: "name_en",
  "Imagen Banner": "image_banner",
  Imagenes: "images",
  // Video: "video", // https://video-a-gif.convertir-pdf.com/
  Descripcion_es: "description_es",
  Descripcion_en: "description_en",
  Etiquetas: "tags",
  Instrucciones_es: "instructions_es",
  Instrucciones_en: "instructions_en",
  Advertencias_es: "warnings_es",
  Advertencias_en: "warnings_en",
  Estatus: "status",
  Bot: "bot",
};
export const tableWorkoutsComplexProperties: NotionTableProperties = {
  Nombre: "name",
  Categoria: "body_zone",
  Repeticiones: "reps",
  Series: "sets",
  Tiempo: "time",
  "Tiempo Unidad": "time_unit",
  Peso: "weight",
  "Peso Unidad": "weight_unit",
  "Minutos Totales": "total_minutes",
  Recomendaciones: "recommendations",
  Comentarios: "comments",
  Ejercicio: "workout_id",
  Estatus: "status",
  Bot: "bot",
}

export const tablePlansProperties: NotionTableProperties = {
  Nombre_es: "name_es",
  Nombre_en: "name_en",
  "Ejercicios Complex": "workouts_complex",
  Etiquetas: "tags",
  Dias: "days",
  "Sesiones por semana": "sets_per_week",
  Personalizado: "custom_email",
  Estatus: "status",
  Bot: "bot",
}