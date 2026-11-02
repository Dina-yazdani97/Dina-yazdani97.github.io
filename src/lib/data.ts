// Data loaders for Keystatic JSON content

export interface ProfileData {
  name: string;
  headline: string;
  statusBadge?: string;
  location: string;
  email: string;
  phone: string;
  englishLevel: string;
  persianLevel: string;
  linkedin: string;
  github: string;
  orcid: string;
  researchgate: string;
 googleScholar?: string;
  bioParagraph1: string;
  bioParagraph2: string;
  bioParagraph3: string;
  stats: Array<{ label: string; value: string; detail: string }>;
}

export interface ResearchInterest {
  title: string;
  tag: string;
  description: string;
  icon: string;
}

export interface SkillsData {
  programmingAndData: string[];
  machineLearning: string[];
  climateAnalysis: string[];
  gisAndRemoteSensing: string[];
  systemsAndComputing: string[];
  statisticalSoftware: string[];
}

export interface EducationItem {
  degreeSlug: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  gpa: string;
  rankBadge: string;
  thesis: string;
  order: number;
}

export interface PublicationItem {
  slug: string;
  title: string;
  authors: string;
  journal: string;
  year: string;
  type: 'Research Article' | 'Technical Report' | 'Submitted Article';
  status: 'Published' | 'Under Review' | 'In Press';
  doiUrl: string;
  isHighlight: boolean;
  badge?: string;
  abstract: string;
  order: number;
}

export interface ExperienceItem {
  slug: string;
  role: string;
  organization: string;
  location: string;
  period: string;
  category: string;
  highlights: string[];
  linkUrl?: string;
  linkLabel?: string;
  order: number;
}

export interface AwardItem {
  slug: string;
  title: string;
  institution: string;
  year: string;
  badge: string;
  details: string;
  order: number;
}

export interface ServiceItem {
  slug: string;
  role: string;
  organization: string;
  date: string;
  badge: string;
  description: string;
  order: number;
}

export interface CertificateItem {
  slug: string;
  title: string;
  provider: string;
  date: string;
  status: string;
  category: string;
  order: number;
}

export interface CommunityItem {
  slug: string;
  title: string;
  organization: string;
  period: string;
  category: string;
  highlights: string[];
  order: number;
}

// Dynamic eager loaders using import.meta.glob
const profileModules = import.meta.glob<ProfileData>('../content/profile/*.json', { eager: true, import: 'default' });
const interestsModules = import.meta.glob<{ items: ResearchInterest[] }>('../content/research-interests/*.json', { eager: true, import: 'default' });
const skillsModules = import.meta.glob<SkillsData>('../content/skills/*.json', { eager: true, import: 'default' });
const educationModules = import.meta.glob<EducationItem>('../content/education/*.json', { eager: true, import: 'default' });
const publicationModules = import.meta.glob<PublicationItem>('../content/publications/*.json', { eager: true, import: 'default' });
const experienceModules = import.meta.glob<ExperienceItem>('../content/experiences/*.json', { eager: true, import: 'default' });
const awardModules = import.meta.glob<AwardItem>('../content/awards/*.json', { eager: true, import: 'default' });
const serviceModules = import.meta.glob<ServiceItem>('../content/services/*.json', { eager: true, import: 'default' });
const certificateModules = import.meta.glob<CertificateItem>('../content/certificates/*.json', { eager: true, import: 'default' });
const communityModules = import.meta.glob<CommunityItem>('../content/community/*.json', { eager: true, import: 'default' });

export function getProfile(): ProfileData {
  const file = Object.values(profileModules)[0];
  return file as ProfileData;
}

export function getResearchInterests(): ResearchInterest[] {
  const file = Object.values(interestsModules)[0];
  return file?.items || [];
}

export function getSkills(): SkillsData {
  const file = Object.values(skillsModules)[0];
  return file as SkillsData;
}

export function getEducation(): EducationItem[] {
  return Object.values(educationModules).sort((a, b) => (a.order || 0) - (b.order || 0));
}

export function getPublications(): PublicationItem[] {
  return Object.values(publicationModules).sort((a, b) => (a.order || 0) - (b.order || 0));
}

export function getExperiences(): ExperienceItem[] {
  return Object.values(experienceModules).sort((a, b) => (a.order || 0) - (b.order || 0));
}

export function getAwards(): AwardItem[] {
  return Object.values(awardModules).sort((a, b) => (a.order || 0) - (b.order || 0));
}

export function getServices(): ServiceItem[] {
  return Object.values(serviceModules).sort((a, b) => (a.order || 0) - (b.order || 0));
}

export function getCertificates(): CertificateItem[] {
  return Object.values(certificateModules).sort((a, b) => (a.order || 0) - (b.order || 0));
}

export function getCommunity(): CommunityItem[] {
  return Object.values(communityModules).sort((a, b) => (a.order || 0) - (b.order || 0));
}
