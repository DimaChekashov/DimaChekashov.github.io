export type TechDirection = {
  id: string;
  title: string;
  techs: Tech[];
};

export type Tech = {
  id: string;
  title: string;
  icon: string;
};

export type Education = {
  id: string;
  place: string;
  period: string;
  details: string;
};

export type Work = {
  id: string;
  company: string;
  place: string;
  period: string;
  role: string;
  responsibilities: string[];
};
