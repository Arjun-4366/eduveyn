import { ENDPOINTS } from '@/constants/endpoints';
import { ISiteContent, ISiteContentResponse } from '@/types/siteContent/siteContent';

export const EMPTY_SITE_CONTENT: ISiteContent = {
  header: { title: '', subtitle: '' },
  stats: [],
  steps: { title: '', subtitle: '', icon: '', steps: [] },
  mission: { title: '', subtitle: '', description: '', items: [] },
  teaching_quality: { title: '', subtitle: '', description: '', items: [] },
  contact: {
    whatsapp: '',
    email: '',
    phone: '',
    address: '',
    social: { facebook: '', instagram: '', linkedin: '', x: '', youtube: '' },
  },
  about: { aboutTitle: '', aboutSubtitle: '' },
  faq: { faqTitle: '', faqSubtitle: '' },
  why_choose_us: { title: '', subtitle: '', items: null },
  pricing: { label: '', title: '', subtitle: '', plans: null },
  updated_at: '',
};

export async function getSiteContent(): Promise<ISiteContentResponse> {
  const res = await fetch(ENDPOINTS.GET_SITE_CONTENT, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch site content: ${res.status}`);
  }

  return res.json();
}
