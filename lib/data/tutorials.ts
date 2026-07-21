export type Tutorial = {
  id: string;
  title: string;
  venue: string;
  date: string;
  description: string;
  links?: {
    slides?: string;
    poster?: string;
    photos?: string;
    video?: string;
  };
};

export const tutorials: Tutorial[] = [
  {
    id: "1",
    title: "Hands-On Tutorial Session",
    venue: "MIDA 2023, SMIT, Sikkim & IDEAS-TIH, ISI Kolkata",
    date: "2023",
    description: "Focused on self-supervised learning applications in medical imaging with practical implementations and case studies.",
  },
];
