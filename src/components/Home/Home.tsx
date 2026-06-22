import HomeHero from './HomeHero';
import HomeServices from './HomeServices';
import PopularSubjects from './PopularSubjects';
import TeacherHighlights from './TeacherHighlights';
import HowItWorks from './HowItWorks';
import Testimonials from './Testimonials';
import AboutStats from '@/components/About/AboutStats';

const Home = () => {
  return (
    <div>
      <HomeHero />
      <AboutStats />
      <PopularSubjects />
      <HomeServices />
      <TeacherHighlights />
      <HowItWorks />
      <Testimonials />
    </div>
  );
};

export default Home;
