interface Teacher {
  id: string;
  fullName: string;
  email: string;
  imageUrl?: string;
  role: string;
  bio: string;
  title: string;
  status: "ACTIVE" | "INACTIVE";
  created_at: string;
  updated_at: string;
}

interface Category {
  id: string;
  name: string;
}

interface Certification {
  id: string;
  name: string;
  slug: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

interface Lesson {
  id: string;
  name: string;
}

interface Module {
  id: string;
  name: string;
  description: string;
  lessons: Lesson[];
}

export interface FormationDetails {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  level: "beginner" | "intermediate" | "advanced";
  duration: number; // en semaines
  price: number;
  capacity: number;
  enrolled_students: number;
  teacher: Teacher;
  category: Category;
  course_type: "DAY" | "NIGHT";
  start_date: string; // Format YYYY-MM-DD
  end_date: string; // Format YYYY-MM-DD
  link: string;
  certifications: Certification[];
  prerequisites: string[];
  objectives: string[];
  modules: Module[];
  created_at: string;
  updated_at: string;
}
