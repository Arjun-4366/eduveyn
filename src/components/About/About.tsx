import AboutHero from './AboutHero';
import AboutStats from './AboutStats';
import AboutMission from './AboutMission';
import AboutQuality from './AboutQuality';
import AboutVision from './AboutVision';
import { getSiteContent, EMPTY_SITE_CONTENT } from '@/services/siteContent';
import { safeFetch } from '@/lib/utils';

export default async function About() {
  const siteContent = await safeFetch(async () => (await getSiteContent()).data, EMPTY_SITE_CONTENT);

  return (
    <main className="min-h-screen">
      <AboutHero about={siteContent.about} />
      <AboutStats stats={siteContent.stats} />
      <AboutMission mission={siteContent.mission} />
      <AboutQuality quality={siteContent.teaching_quality} />
      <AboutVision />
    </main>
  );
}
