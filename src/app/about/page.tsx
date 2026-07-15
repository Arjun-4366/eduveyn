import type { Metadata } from 'next';
import About from '@/components/About/About';

export const metadata: Metadata = {
  title: 'About Us',
  description: "Learn about Eduveyn's mission to connect students with verified, expert online tutors for personalized, one-on-one learning across every subject and grade level.",
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    url: '/about',
    title: 'About Eduveyn',
    description: "Learn about Eduveyn's mission to connect students with verified, expert online tutors for personalized, one-on-one learning.",
  },
};

export default function AboutPage() {
  return <About />;
}
