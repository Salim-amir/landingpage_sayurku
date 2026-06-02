export interface Product {
  id: string;
  name: string;
  category: "sayur" | "buah" | "bumbu" | "dapur" | "sayur_hijau" | "umbi_umbian";
  price: number;
  unit: string;
  image: string;
  rating: number;
  isFresh: boolean;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  tagline: string;
  iconName: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  stars: number;
  avatar: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface TimelineStep {
  step: number;
  title: string;
  description: string;
}
