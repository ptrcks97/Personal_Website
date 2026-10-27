/**
 * Alle Inhalte der Website an einem Ort.
 * Texte sind zweisprachig ({ de, en }) – einfach hier anpassen.
 */

export type Lang = 'de' | 'en';
export type L = Record<Lang, string>;

export type SkillLevel = 'expert' | 'proficient' | 'basic';

export interface Skill {
  name: string;
  level: SkillLevel;
}

export interface CareerEntry {
  id: string;
  from: string; // YYYY-MM
  to: string | null; // null = laufend
  kind: 'edu' | 'work' | 'svc';
  org: string;
  place: string;
  role: L;
}

export interface ProjectMedia {
  /** Pfad relativ zu /public, z.B. 'projects/tell/app.jpg'. null = Platzhalter */
  src: string | null;
  caption: L;
}

export interface Project {
  id: string;
  name: string;
  tagline: L;
  description: L;
  stack: string[];
  status: L;
  links: { label: string; url: string }[];
  media: ProjectMedia[];
}

export const PROFILE = {
  name: 'Patrick Schöpfer',
  handle: 'patrick',
  role: { de: 'AI Software Engineer', en: 'AI Software Engineer' } as L,
  location: 'Morschach, Schwyz · CH',
  photo: 'img/patrick.jpg',
  email: 'schoepfer.patrick97@gmail.com',
  linkedin: 'https://www.linkedin.com/in/patrick-sch%C3%B6pfer-764a85295/',
  github: 'https://github.com/ptrcks97',
  /** Lebenslauf: PDF nach public/cv/ legen und available auf true setzen. */
  cv: { file: 'cv/Lebenslauf_Patrick_Schoepfer.pdf', available: false },
  careerStart: '2014-08-01',

  /** Angaben fürs Impressum. street optional – null blendet die Zeile aus. */
  legal: {
    street: null as string | null,
    zip: '6443',
    city: 'Morschach',
    country: { de: 'Schweiz', en: 'Switzerland' } as L,
    updated: '2026-10',
  },

  bio: {
    de: 'Ich baue KI-Systeme, die Menschen tatsächlich weiterbringen – von eigenen AI Agents über Machine Learning bis hin zu VR. Mein Weg führte von der Informatiklehre bei Siemens über die Pädagogische Hochschule zum Computer-Science-Bachelor an der HSLU. Darum kann ich Technik nicht nur bauen, sondern auch verständlich erklären.',
    en: 'I build AI systems that genuinely move people forward – from custom AI agents and machine learning to VR. My path led from an IT apprenticeship at Siemens through teacher training to a Computer Science bachelor at HSLU. That is why I can not only build technology, but also explain it clearly.',
  } as L,

  availability: {
    onsite: true,
    remote: true,
  },

  traits: [
    { proc: 'friendliness.d', label: { de: 'Freundlich', en: 'Friendly' } },
    { proc: 'ambition.d', label: { de: 'Ehrgeizig', en: 'Ambitious' } },
    { proc: 'helpfulness.d', label: { de: 'Hilfsbereit', en: 'Helpful' } },
    { proc: 'diligence.d', label: { de: 'Pflichtbewusst', en: 'Conscientious' } },
  ],

  languages: [
    { name: 'Python', level: 'expert' },
    { name: 'Java', level: 'proficient' },
    { name: 'Angular', level: 'proficient' },
    { name: 'JavaScript', level: 'proficient' },
    { name: 'Flutter', level: 'proficient' },
    { name: 'C#', level: 'basic' },
    { name: 'Swift', level: 'basic' },
  ] as Skill[],

  capabilities: [
    { name: 'AI Agents', level: 'proficient' },
    { name: 'Machine Learning', level: 'proficient' },
    { name: 'VR Development', level: 'proficient' },
    { name: 'Web Development', level: 'proficient' },
    { name: 'App Dev + Deployment', level: 'proficient' },
    { name: 'Visual AI + Raytracing', level: 'basic' },
    { name: '3D Modelling', level: 'basic' },
  ] as Skill[],

  career: [
    {
      id: 'siemens',
      from: '2014-08',
      to: '2018-08',
      kind: 'edu',
      org: 'Siemens Schweiz AG',
      place: 'Zug',
      role: {
        de: 'Lehre Informatiker Applikationsentwicklung',
        en: 'Apprenticeship, IT Specialist Application Development',
      },
    },
    {
      id: 'service',
      from: '2018-08',
      to: '2019-09',
      kind: 'svc',
      org: 'Militär & Zivildienst',
      place: '',
      role: { de: 'Militär- und Zivildienst', en: 'Military & civilian service' },
    },
    {
      id: 'phlu',
      from: '2019-09',
      to: '2022-05',
      kind: 'edu',
      org: 'PH Luzern',
      place: 'Luzern',
      role: { de: 'Studium Pädagogische Hochschule', en: 'Studies, University of Teacher Education' },
    },
    {
      id: 'hslu',
      from: '2022-09',
      to: '2026-07',
      kind: 'edu',
      org: 'HSLU',
      place: 'Luzern',
      role: { de: 'BSc Computer Science', en: 'BSc Computer Science' },
    },
    {
      id: 'finnova-intern',
      from: '2023-03',
      to: '2026-08',
      kind: 'work',
      org: 'Finnova Bankware AG',
      place: '',
      role: { de: 'Praktikant Entwicklung Informatik', en: 'Software Development Intern' },
    },
    {
      id: 'finnova',
      from: '2026-09',
      to: null,
      kind: 'work',
      org: 'Finnova Bankware AG',
      place: '',
      role: { de: 'AI Software Engineer', en: 'AI Software Engineer' },
    },
  ] as CareerEntry[],

  projects: [
    {
      id: 'tell',
      name: 'Tell Experience',
      tagline: {
        de: 'Wilhelm Tell als KI-Gesprächspartner',
        en: 'Wilhelm Tell as an AI conversation partner',
      },
      description: {
        de: 'Ein Gespräch mit der Schweizer Legende: Die Tell Experience lässt Wilhelm Tell als KI-Charakter lebendig werden. Statt Geschichte aus dem Lehrbuch zu lesen, stellt man ihm Fragen und erlebt sie im Dialog. Das Projekt hat es bis in die Zeitung geschafft.',
        en: 'A conversation with a Swiss legend: Tell Experience brings Wilhelm Tell to life as an AI character. Instead of reading history from a textbook, you ask him questions and experience it through dialogue. The project even made it into the newspaper.',
      },
      stack: ['Conversational AI', 'LLM', 'AI Agents', 'Storytelling'],
      status: { de: 'IN DER PRESSE', en: 'FEATURED IN PRESS' },
      links: [],
      media: [
        { src: null, caption: { de: 'Screenshot der Applikation', en: 'Application screenshot' } },
        { src: null, caption: { de: 'Zeitungsartikel', en: 'Newspaper article' } },
      ],
    },
    {
      id: 'fotobox',
      name: 'Fotobox',
      tagline: {
        de: 'Reale Objekte rein, 3D-Modell raus',
        en: 'Real objects in, 3D models out',
      },
      description: {
        de: 'Eine Fotobox aus Holz mit relativ günstiger Hardware, die reale Objekte in 3D-Modelle verwandelt. Ein Raspberry Pi filmt das Objekt auf einem 3D-gedruckten Drehteller, eine Python-Pipeline extrahiert Frames und Masken, rekonstruiert mit COLMAP und trainiert anschliessend ein Gaussian Splatting. Entstanden im HSLU-Modul CVAI.',
        en: 'A wooden photo box built from fairly inexpensive hardware that turns real-world objects into 3D models. A Raspberry Pi films the object on a 3D-printed turntable; a Python pipeline extracts frames and masks, reconstructs it with COLMAP and then trains a Gaussian Splatting model. Built for the HSLU CVAI module.',
      },
      stack: ['Python', 'Raspberry Pi', 'COLMAP', 'Gaussian Splatting', 'CUDA', '3D Print'],
      status: { de: 'OPEN SOURCE', en: 'OPEN SOURCE' },
      links: [{ label: 'GitHub', url: 'https://github.com/ptrcks97/Fotobox' }],
      media: [],
    },
    {
      id: 'scriba',
      name: 'Scriba',
      tagline: {
        de: 'Zusammenfassungs-Assistent für Studierende',
        en: 'Summarisation assistant for students',
      },
      description: {
        de: 'Eine schlanke Web-App, die Studierenden hilft, Unterlagen schnell auf das Wesentliche zu reduzieren. Einfach zu bedienen, ohne Ballast, mit KI im Hintergrund.',
        en: 'A lean web app that helps students boil their course material down to what matters. Simple to use, no clutter, AI under the hood.',
      },
      stack: ['Web', 'AI', 'NLP'],
      status: { de: 'LIVE', en: 'LIVE' },
      links: [{ label: 'scriba.noxarius.ch', url: 'https://scriba.noxarius.ch/' }],
      media: [],
    },
    {
      id: 'amareno',
      name: 'Amareno',
      tagline: {
        de: 'Firmenwebsite für eine Beratung aus Schwyz',
        en: 'Company website for a consultancy in Schwyz',
      },
      description: {
        de: 'Konzeption und Umsetzung der Website der Amareno GmbH, einer unabhängigen Beratung für KMU, Organisationen und Privatpersonen. Klar strukturiert, responsiv und auf Kontaktaufnahme ausgelegt.',
        en: 'Concept and implementation of the website for Amareno GmbH, an independent consultancy for SMEs, organisations and private clients. Clearly structured, responsive and built to drive contact.',
      },
      stack: ['Web Development', 'Responsive Design', 'UX'],
      status: { de: 'LIVE', en: 'LIVE' },
      links: [{ label: 'amareno.ch', url: 'https://www.amareno.ch/' }],
      media: [],
    },
  ] as Project[],
};

export const LEVEL_LABEL: Record<SkillLevel, L> = {
  expert: { de: 'EXPERTE', en: 'EXPERT' },
  proficient: { de: 'SICHER', en: 'PROFICIENT' },
  basic: { de: 'GRUNDLAGEN', en: 'FOUNDATION' },
};

export const LEVEL_VALUE: Record<SkillLevel, number> = {
  expert: 19,
  proficient: 15,
  basic: 8,
};
