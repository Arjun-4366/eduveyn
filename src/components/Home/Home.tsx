import HomeHero from './HomeHero';
import HomeServices from './HomeServices';
import PopularSubjects from './PopularSubjects';
import TeacherHighlights from './TeacherHighlights';
import HowItWorks from './HowItWorks';
import Testimonials from './Testimonials';
import WhyChooseEduweyn from './WhyChooseEduweyn';
import StudyOptions from './StudyOptions';
import FAQ from './FAQ';
import AboutStats from '@/components/About/AboutStats';
import { getReviews } from '@/services/review';
import { getTutors } from '@/services/tutor';
import { getFaqs } from '@/services/faq';
import { safeFetch } from '@/lib/utils';

const Home = async () => {
  const reviews = await safeFetch(async () => (await getReviews({ limit: 20 })).data.reviews, []);
  const tutors = await safeFetch(async () => (await getTutors({ limit: 3 })).data.tutors, []);
  const faqs = await safeFetch(async () => (await getFaqs()).data, []);

  return (
    <div>
      <HomeHero />
      <AboutStats />
      <WhyChooseEduweyn />
      <PopularSubjects />
      <StudyOptions />
      <HomeServices />
      <TeacherHighlights tutors={tutors} />
      <HowItWorks />
      <Testimonials reviews={reviews} />
      <FAQ faqs={faqs} />
    </div>
  );
};

export default Home;
