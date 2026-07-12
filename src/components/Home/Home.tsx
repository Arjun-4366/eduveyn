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
import { getSubjects } from '@/services/subject';
import { getSiteContent, EMPTY_SITE_CONTENT } from '@/services/siteContent';
import { safeFetch } from '@/lib/utils';

const Home = async () => {
  const reviews = await safeFetch(async () => (await getReviews({ limit: 20 })).data.reviews, []);
  const tutors = await safeFetch(async () => (await getTutors({ limit: 3 })).data.tutors, []);
  const faqs = await safeFetch(async () => (await getFaqs()).data, []);
  const subjects = await safeFetch(async () => (await getSubjects()).data, []);
  const siteContent = await safeFetch(async () => (await getSiteContent()).data, EMPTY_SITE_CONTENT);

  return (
    <div>
      <HomeHero header={siteContent.header} />
      <AboutStats stats={siteContent.stats} />
      <WhyChooseEduweyn header={siteContent.why_choose_us} />
      <PopularSubjects subjects={subjects} />
      <StudyOptions pricing={siteContent.pricing} />
      <HomeServices />
      <TeacherHighlights tutors={tutors} />
      <HowItWorks steps={siteContent.steps} />
      <Testimonials reviews={reviews} />
      <FAQ faqs={faqs} header={siteContent.faq} />
    </div>
  );
};

export default Home;
