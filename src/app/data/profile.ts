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
  /** Optionale Zusatzzeile im Log, z. B. Schwerpunkt oder Abschluss */
  note?: L;
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
  /** Presseartikel – wird als Karte mit Link zum Original angezeigt */
  press?: { outlet: string; title: string; date: string; url: string };
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
  cv: { file: 'cv/Lebenslauf_Patrick_Schoepfer.pdf', available: true },
  careerStart: '2014-08-01',

  /** Angaben fürs Impressum. street optional – null blendet die Zeile aus. */
  legal: {
    street: null as string | null,
    zip: '6443',
    city: 'Morschach',
    country: { de: 'Schweiz', en: 'Switzerland' } as L,
    updated: '2026-11',
  },

  bio: {
    de: 'Ich baue KI-Systeme, die Menschen tatsächlich weiterbringen – von eigenen AI Agents über Machine Learning bis hin zu VR. Mein Weg führte von der Informatiklehre mit Berufsmaturität bei Siemens über das Studium zur Sekundarlehrperson an der PH Luzern zum Informatik-Bachelor an der HSLU. Darum kann ich Technik nicht nur bauen, sondern auch verständlich erklären.',
    en: 'I build AI systems that genuinely move people forward – from custom AI agents and machine learning to VR. My path led from an IT apprenticeship with vocational baccalaureate at Siemens through secondary teacher training at PH Luzern to a Computer Science bachelor at HSLU. That is why I can not only build technology, but also explain it clearly.',
  } as L,

  availability: {
    onsite: true,
    remote: true,
  },

  /**
   * Optionales Zitat einer Referenzperson (Vorgesetzte/r, Dozent/in).
   * null = Abschnitt wird ausgeblendet. Beispiel:
   * { text: { de: '…', en: '…' }, author: 'Vorname Nachname', role: { de: 'Teamleiter, Finnova', en: 'Team Lead, Finnova' } }
   */
  testimonial: null as { text: L; author: string; role: L } | null,

  /** Gesprochene Sprachen (laut Lebenslauf) */
  spokenLanguages: [
    { de: 'Deutsch (Muttersprache)', en: 'German (native)' },
    { de: 'Englisch (gut)', en: 'English (good)' },
    { de: 'Französisch (Schulkenntnisse)', en: 'French (basic)' },
  ] as L[],

  /** Arbeitsweise als systemd-Units – jede mit einer Zeile, die sie belegt. */
  traits: [
    {
      proc: 'pragmatism.service',
      label: { de: 'Pragmatisch', en: 'Pragmatic' },
      desc: {
        de: 'Schnell zum funktionierenden Prototyp, dann iterieren.',
        en: 'Get to a working prototype fast, then iterate.',
      },
    },
    {
      proc: 'teaching.service',
      label: { de: 'Erklären können', en: 'Explaining clearly' },
      desc: {
        de: 'Komplexes verständlich machen – geprägt durch die PH Luzern.',
        en: 'Making complex things understandable – shaped by teacher training at PH Luzern.',
      },
    },
    {
      proc: 'responsible-ai.service',
      label: { de: 'Verantwortungsvolle KI', en: 'Responsible AI' },
      desc: {
        de: 'Sorgfältig mit Daten, Tests und den Grenzen von KI.',
        en: 'Careful with data, testing and the limits of AI.',
      },
    },
    {
      proc: 'curiosity.service',
      label: { de: 'Neugierig', en: 'Curious' },
      desc: {
        de: 'Neues ausprobieren – von LLMs bis Raspberry Pi.',
        en: 'Trying new things – from LLMs to Raspberry Pi.',
      },
    },
    {
      proc: 'teamwork.service',
      label: { de: 'Teamorientiert', en: 'Team player' },
      desc: {
        de: 'Hilfsbereit, Wissen teilen, Feedback geben und annehmen.',
        en: 'Helpful, sharing knowledge, giving and taking feedback.',
      },
    },
  ] as { proc: string; label: L; desc: L }[],

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
        de: 'Lehre Informatiker EFZ Applikationsentwicklung',
        en: 'Apprenticeship, IT Specialist (EFZ) Application Development',
      },
      note: { de: 'Mit Berufsmaturität abgeschlossen', en: 'Completed with vocational baccalaureate (BM)' },
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
      role: { de: 'Studium Sekundarlehrperson', en: 'Studies, secondary school teacher' },
      note: {
        de: '2019 zusätzlich Klassenassistenz bei Intermezzo – Förderung von Kindern mit Lernschwäche',
        en: '2019 also class assistant at Intermezzo – supporting children with learning difficulties',
      },
    },
    {
      id: 'hslu',
      from: '2022-09',
      to: '2026-07',
      kind: 'edu',
      org: 'HSLU',
      place: 'Luzern',
      role: { de: 'Bachelor Informatik (Teilzeit)', en: 'BSc Computer Science (part-time)' },
      note: { de: 'Abgeschlossen · Bachelorarbeit mit Note 6.0', en: 'Completed · bachelor thesis graded 6.0 (top grade)' },
    },
    {
      id: 'finnova-intern',
      from: '2023-03',
      to: '2026-08',
      kind: 'work',
      org: 'Finnova Bankware AG',
      place: '',
      role: {
        de: 'Praktikant Entwicklung Informatik',
        en: 'Software Development Intern',
      },
      note: { de: 'Teilzeitpensum, parallel zum Studium', en: 'Part-time, alongside studies' },
    },
    {
      id: 'finnova',
      from: '2026-09',
      to: null,
      kind: 'work',
      org: 'Finnova Bankware AG',
      place: '',
      role: { de: 'AI Software Engineer', en: 'AI Software Engineer' },
      note: {
        de: 'Entwicklung LLM-basierter Funktionen für firmeninterne Tools',
        en: 'Building LLM-based features for internal company tools',
      },
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
        de: 'Meine Bachelorarbeit an der HSLU: ein virtueller Wilhelm Tell, mit dem man per VR-Brille am Tisch in seinem Haus sitzt und sich unterhält. Das KI-System dahinter habe ich selbst gebaut – mit Schillers «Wilhelm Tell» als Wissensbasis und Leitplanken, etwa gegen explizite Gewaltschilderungen. Avatar und Umgebung habe ich selbst modelliert und programmiert. In einer Nutzerstudie mit rund 20 Personen wurde die VR-Version signifikant besser bewertet als eine reine Audio-Version.',
        en: 'My bachelor thesis at HSLU: a virtual Wilhelm Tell you sit across the table from in VR and talk to. I built the AI system behind it myself – grounded in Schiller’s play «Wilhelm Tell», with guardrails such as no explicit descriptions of violence. I modelled and programmed the avatar and environment myself. In a user study with around 20 participants, the VR version was rated significantly better than an audio-only version.',
      },
      stack: ['VR', 'LLM', 'Conversational AI', 'Guardrails', '3D Modelling', 'User Study'],
      status: { de: 'IN DER PRESSE', en: 'FEATURED IN PRESS' },
      links: [
        {
          label: 'Luzerner Zeitung',
          url: 'https://www.luzernerzeitung.ch/zentralschweiz/kanton-luzern/wilhelm-tell-luzerner-student-bringt-nationalheld-zum-reden-ld.4199345',
        },
      ],
      press: {
        outlet: 'Luzerner Zeitung',
        title: 'Jetzt spricht Wilhelm Tell',
        date: '2026',
        url: 'https://www.luzernerzeitung.ch/zentralschweiz/kanton-luzern/wilhelm-tell-luzerner-student-bringt-nationalheld-zum-reden-ld.4199345',
      },
      media: [
        {
          src: 'projects/tell/tell-presse.jpg',
          caption: {
            de: 'Mit VR-Brille und dem KI-Tell auf dem Laptop · Bild: Patrick Hürlimann / Luzerner Zeitung',
            en: 'With VR headset and the AI Tell on the laptop · Photo: Patrick Hürlimann / Luzerner Zeitung',
          },
        },
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
