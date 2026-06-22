import AboutHero from './AboutHero';
import AboutStats from './AboutStats';
import AboutMission from './AboutMission';
import AboutQuality from './AboutQuality';
import AboutVision from './AboutVision';

export default function   About() {
  return (
    <main className="min-h-screen">
      <AboutHero />
      <AboutStats />
      <AboutMission />
      <AboutQuality />
      <AboutVision />
    </main>
  );
}
