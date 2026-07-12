const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const ENDPOINTS = {
  // reviews
  GET_REVIEWS: `${API_BASE_URL}/reviews`,
  CREATE_REVIEW: `${API_BASE_URL}/reviews`,

  // tutors
  GET_TUTORS: `${API_BASE_URL}/tutors`,

  // contact messages
  CREATE_CONTACT_MESSAGE: `${API_BASE_URL}/contact-messages`,

  // faqs
  GET_FAQS: `${API_BASE_URL}/faqs`,

  // subjects
  GET_SUBJECTS: `${API_BASE_URL}/subjects`,

  // classes
  GET_CLASSES: `${API_BASE_URL}/classes`,

  // syllabi
  GET_SYLLABI: `${API_BASE_URL}/syllabi`,

  // tutor applications
  CREATE_TUTOR_APPLICATION: `${API_BASE_URL}/tutor-applications`,

  // demo bookings
  CREATE_DEMO_BOOKING: `${API_BASE_URL}/demo-bookings`,
};

export { ENDPOINTS };
