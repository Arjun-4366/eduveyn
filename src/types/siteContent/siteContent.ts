export interface ISiteContentHeader {
  title: string;
  subtitle: string;
}

export interface ISiteContentStat {
  value: string;
  label: string;
}

export interface ISiteContentStep {
  icon: string;
  title: string;
  subtitle: string;
}

export interface ISiteContentSteps {
  title: string;
  subtitle: string;
  icon: string;
  steps: ISiteContentStep[];
}

export interface ISiteContentMissionItem {
  icon: string;
  title: string;
  subtitle: string;
}

export interface ISiteContentMission {
  title: string;
  subtitle: string;
  description: string;
  items: ISiteContentMissionItem[];
}

export interface ISiteContentTeachingQualityItem {
  title: string;
  subtitle: string;
}

export interface ISiteContentTeachingQuality {
  title: string;
  subtitle: string;
  description: string;
  items: ISiteContentTeachingQualityItem[];
}

export interface ISiteContentSocial {
  facebook: string;
  instagram: string;
  linkedin: string;
  x: string;
  youtube: string;
}

export interface ISiteContentContact {
  whatsapp: string;
  email: string;
  phone: string;
  address: string;
  social: ISiteContentSocial;
}

export interface ISiteContentAbout {
  aboutTitle: string;
  aboutSubtitle: string;
}

export interface ISiteContentFaq {
  faqTitle: string;
  faqSubtitle: string;
}

export interface ISiteContentWhyChooseUsItem {
  icon: string;
  title: string;
  subtitle: string;
}

export interface ISiteContentWhyChooseUs {
  title: string;
  subtitle: string;
  items: ISiteContentWhyChooseUsItem[] | null;
}

export interface ISiteContentPricingPlan {
  icon: string;
  badge: string;
  price: string;
  title: string;
  subtitle: string;
  features: string[];
}

export interface ISiteContentPricing {
  label: string;
  title: string;
  subtitle: string;
  plans: ISiteContentPricingPlan[] | null;
}

export interface ISiteContent {
  header: ISiteContentHeader;
  stats: ISiteContentStat[];
  steps: ISiteContentSteps;
  mission: ISiteContentMission;
  teaching_quality: ISiteContentTeachingQuality;
  contact: ISiteContentContact;
  about: ISiteContentAbout;
  faq: ISiteContentFaq;
  why_choose_us: ISiteContentWhyChooseUs;
  pricing: ISiteContentPricing;
  updated_at: string;
}

export interface ISiteContentResponse {
  success: boolean;
  data: ISiteContent;
}
