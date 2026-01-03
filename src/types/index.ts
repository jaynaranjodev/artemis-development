// Auth & Admin
export interface AdminSession {
  username: string;
  role: string;
  loginTime: string;
}

// Academy
export interface Academy {
  id: string;
  name: string;
  slug: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  primaryColor: string;
  secondaryColor: string;
  card1Title?: string;
  card1Description?: string;
  card1Image?: string;
  card2Title?: string;
  card2Description?: string;
  card2Image?: string;
  card3Title?: string;
  card3Description?: string;
  card3Image?: string;
}

// Dashboard Cards
export interface AcademyCard {
  title: string;
  description: string;
  image: string;
}

// Class-related
export interface Class {
  id: string;
  name: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  classType?: string;
  instructorId?: string;
  academyId: string;
}
