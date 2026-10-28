'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/animations';
import { ISubject } from '@/types/subjects/subjects';
import { IClass } from '@/types/classes/classes';
import { ISyllabus } from '@/types/syllabi/syllabi';
import { createTutorApplication } from '@/services/tutorApplication';

const steps = [
  { num: 1, label: 'Personal Info',     frameColor: '#4915b0' },
  { num: 2, label: 'Teaching Details',  frameColor: '#D97706' },
  { num: 3, label: 'Review & Submit',   frameColor: '#059669' },
];

type FormState = {
  full_name: string;
  email: string;
  phone: string;
  location: string;
  subject_ids: string[];
  class_ids: string[];
  syllabus_ids: string[];
  experience: string;
  bio: string;
  resume: File | null;
};

const emptyForm: FormState = {
  full_name: '', email: '', phone: '', location: '',
  subject_ids: [], class_ids: [], syllabus_ids: [],
  experience: '', bio: '', resume: null,
};

const ALLOWED_RESUME_EXTENSIONS = ['.pdf', '.doc', '.docx'];

export default function TeacherApplicationForm({
  subjects,
  classes,
  syllabi,
}: {
  subjects: ISubject[];
  classes: IClass[];
  syllabi: ISyllabus[];
}) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [step1Error, setStep1Error] = useState<string | null>(null);
  const [step2Error, setStep2Error] = useState<string | null>(null);
  const [resumeError, setResumeError] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);

  const toggleId = (key: 'subject_ids' | 'class_ids' | 'syllabus_ids', id: string) =>
    setForm((f) => ({ ...f, [key]: f[key].includes(id) ? f[key].filter((x) => x !== id) : [...f[key], id] }));

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) {
      setForm((f) => ({ ...f, resume: null }));
      return;
    }
    const extension = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();
    if (!ALLOWED_RESUME_EXTENSIONS.includes(extension)) {
      setResumeError('Please upload a .pdf, .doc, or .docx file.');
      setForm((f) => ({ ...f, resume: null }));
      e.target.value = '';
      return;
    }
    setResumeError(null);
    setForm((f) => ({ ...f, resume: file }));
  };

  const goToStep2 = () => {
    const isStep1Valid =
      form.full_name.trim() !== '' &&
      form.email.trim() !== '' &&
      form.phone.trim() !== '' &&
      form.location.trim() !== '';

    if (!isStep1Valid) {
      setStep1Error('Please fill in all fields before continuing.');
      return;
    }
    setStep1Error(null);
    setStep(2);
  };

  const goToStep3 = () => {
    const missing: string[] = [];
    if (form.subject_ids.length === 0) missing.push('at least one Subject');
    if (form.class_ids.length === 0) missing.push('at least one Class');
    if (form.syllabus_ids.length === 0) missing.push('at least one Syllabus');
    if (form.experience.trim() === '') missing.push('Teaching Experience');
    if(form.bio.trim() === '') missing.push('Bio');
    if (!form.resume) missing.push('Resume');

    if (missing.length > 0) {
      setStep2Error(`Please provide: ${missing.join(', ')}.`);
      return;
    }
    setStep2Error(null);
    setResumeError(null);
    setStep(3);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.resume) {
      setResumeError('Please upload your resume (.pdf, .doc, or .docx).');
      return;
    }
    setSubmitting(true);
    setSubmitError(null);
    try {
      await createTutorApplication({ ...form, resume: form.resume });
      setSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Failed to submit application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const currentStep = steps[step - 1];
  const subjectName = (id: string) => subjects.find((s) => s.id === id)?.name;
  const className = (id: string) => classes.find((c) => c.id === id)?.name;
  const syllabusLabel = (id: string) => syllabi.find((s) => s.id === id)?.board;

  return (
    <main className="min-h-screen bg-[#F0F2F5] hero-grid-bg py-12 sm:py-16 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-2xl mx-auto">

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-[30px] sm:rounded-[35px] md:rounded-[40px] overflow-hidden shadow-2xl"
            style={{ backgroundColor: '#059669' }}
          >
            <div className="pt-8 sm:pt-10 px-6 sm:px-8 pb-4 sm:pb-5 text-center">
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.2 }}
                className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-[20px] sm:rounded-[28px] flex items-center justify-center mx-auto mb-4 sm:mb-5 text-3xl sm:text-4xl"
              >
                🎉
              </motion.div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white mb-1">Application Submitted!</h2>
            </div>
            <div className="bg-white mx-3 sm:mx-4 mb-3 sm:mb-4 rounded-[20px] sm:rounded-[24px] md:rounded-[28px] px-6 sm:px-8 py-6 sm:py-8 text-center">
              <p className="text-gray-500 text-sm max-w-xs mx-auto">
                Thank you <span className="font-semibold text-gray-900">{form.full_name}</span>! Our team will review your application and get back to you within 2–3 business days.
              </p>
            </div>
          </motion.div>
        ) : (
          <>
            {/* Page header */}
            <motion.div variants={stagger} initial="hidden" animate="visible" className="text-center mb-6 sm:mb-8">
              <motion.span
                variants={fadeUp}
                className="inline-block text-[10px] sm:text-xs font-semibold uppercase tracking-widest px-4 sm:px-5 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-5 bg-white border border-gray-200 text-gray-500"
              >
                Join Our Team
              </motion.span>
              <motion.h1
                variants={fadeUp}
                className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 px-2 sm:px-0"
              >
                Apply to Join{' '}
                <span className="relative inline-block text-[#4915b0]">
                  Eduveyn
                  <svg className="absolute left-0 w-full -bottom-1 sm:-bottom-1.5" height="6" viewBox="0 0 80 6" preserveAspectRatio="none">
                    <path d="M0,3 C20,0 60,6 80,3" stroke="#F59E0B" strokeWidth="3" fill="none" strokeLinecap="round" />
                  </svg>
                </span>
              </motion.h1>
              <motion.p
                variants={fadeUp}
                className="text-gray-500 text-xs sm:text-sm max-w-md mx-auto px-2 sm:px-0"
              >
                Teach online, earn on your schedule, and help students achieve their goals.
              </motion.p>
            </motion.div>

            {/* Main card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-[30px] sm:rounded-[35px] md:rounded-[40px] overflow-hidden shadow-2xl"
              style={{ backgroundColor: currentStep.frameColor }}
            >
              {/* Colored top — step indicator */}
              <div className="pt-5 sm:pt-7 px-4 sm:px-7 pb-4 sm:pb-6">
                <div className="flex items-center justify-between">
                  {steps.map((s, i) => (
                    <div key={s.num} className="flex items-center gap-1.5 sm:gap-2 flex-1">
                      <motion.div
                        layout
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold shrink-0 border-2 transition-all duration-300"
                        style={step >= s.num
                          ? { backgroundColor: 'white', borderColor: 'white', color: s.frameColor }
                          : { backgroundColor: 'transparent', borderColor: 'rgba(255,255,255,0.4)', color: 'rgba(255,255,255,0.6)' }
                        }
                      >
                        {step > s.num ? (
                          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="sm:w-[14px] sm:h-[14px]">
                            <path d="M3 7l3 3 5-6" stroke={s.frameColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        ) : s.num}
                      </motion.div>
                      <span className={`text-[10px] sm:text-xs font-semibold hidden sm:block transition-colors duration-300 ${step >= s.num ? 'text-white' : 'text-white/50'}`}>
                        {s.label}
                      </span>
                      {i < steps.length - 1 && (
                        <div className="flex-1 h-px mx-1 sm:mx-2 transition-all duration-300" style={{ backgroundColor: step > s.num ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.2)' }} />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* White form panel */}
              <div className="bg-white mx-3 sm:mx-4 mb-3 sm:mb-4 rounded-[20px] sm:rounded-[24px] md:rounded-[28px] px-4 sm:px-7 py-5 sm:py-7">
                <form onSubmit={handleSubmit}>
                  <AnimatePresence mode="wait">
                    {/* ── Step 1 ── */}
                    {step === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-col gap-4 sm:gap-5"
                      >
                        <h2 className="text-base sm:text-lg font-bold text-gray-900">Personal Information</h2>
                        {[
                          { label: 'Full Name', key: 'full_name', type: 'text', placeholder: 'Your full name' },
                          { label: 'Email Address', key: 'email', type: 'email', placeholder: 'you@email.com' },
                          { label: 'Phone / WhatsApp', key: 'phone', type: 'tel', placeholder: '+971 50 000 0000' },
                          { label: 'Location / City', key: 'location', type: 'text', placeholder: 'Dubai, UAE' },
                        ].map((field) => (
                          <div key={field.key}>
                            <label className="block text-[10px] sm:text-xs font-semibold text-gray-600 mb-1 sm:mb-1.5 uppercase tracking-wide">{field.label} *</label>
                            <input
                              required
                              type={field.type}
                              placeholder={field.placeholder}
                              value={form[field.key as keyof FormState] as string}
                              onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                              className="w-full border border-gray-200 rounded-xl px-3 sm:px-4 py-3 sm:py-3.5 text-sm outline-none focus:border-[#4915b0] focus:ring-2 focus:ring-violet-100 transition-all placeholder-gray-400"
                            />
                          </div>
                        ))}
                        {step1Error && (
                          <p className="text-red-500 text-xs sm:text-sm bg-red-50 border border-red-100 rounded-xl px-3 py-2">{step1Error}</p>
                        )}
                        <button
                          type="button"
                          onClick={goToStep2}
                          className="w-full bg-[#4915b0] text-white font-bold py-3 sm:py-3.5 rounded-xl hover:bg-[#3a0f95] transition-colors text-sm mt-1 sm:mt-2 shadow-lg shadow-violet-200"
                        >
                          Continue →
                        </button>
                      </motion.div>
                    )}

                    {/* ── Step 2 ── */}
                    {step === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-col gap-5 sm:gap-6"
                      >
                        <h2 className="text-base sm:text-lg font-bold text-gray-900">Teaching Details</h2>

                        <div>
                          <label className="block text-[10px] sm:text-xs font-semibold text-gray-600 mb-1.5 sm:mb-2 uppercase tracking-wide">Subjects You Teach *</label>
                          <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            {subjects.map((s) => (
                              <button
                                key={s.id}
                                type="button"
                                onClick={() => toggleId('subject_ids', s.id)}
                                className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-semibold border transition-all duration-200"
                                style={form.subject_ids.includes(s.id)
                                  ? { backgroundColor: '#D97706', color: 'white', borderColor: '#D97706' }
                                  : { backgroundColor: 'white', color: '#6B7280', borderColor: '#E5E7EB' }
                                }
                              >
                                {s.name}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] sm:text-xs font-semibold text-gray-600 mb-1.5 sm:mb-2 uppercase tracking-wide">Classes You Teach *</label>
                          <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            {classes.map((c) => (
                              <button
                                key={c.id}
                                type="button"
                                onClick={() => toggleId('class_ids', c.id)}
                                className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-semibold border transition-all duration-200"
                                style={form.class_ids.includes(c.id)
                                  ? { backgroundColor: '#D97706', color: 'white', borderColor: '#D97706' }
                                  : { backgroundColor: 'white', color: '#6B7280', borderColor: '#E5E7EB' }
                                }
                              >
                                {c.name}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] sm:text-xs font-semibold text-gray-600 mb-1.5 sm:mb-2 uppercase tracking-wide">Syllabi You&apos;re Familiar With *</label>
                          <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            {syllabi.map((syl) => (
                              <button
                                key={syl.id}
                                type="button"
                                onClick={() => toggleId('syllabus_ids', syl.id)}
                                className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-semibold border transition-all duration-200"
                                style={form.syllabus_ids.includes(syl.id)
                                  ? { backgroundColor: '#D97706', color: 'white', borderColor: '#D97706' }
                                  : { backgroundColor: 'white', color: '#6B7280', borderColor: '#E5E7EB' }
                                }
                              >
                                {syl.board}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] sm:text-xs font-semibold text-gray-600 mb-1 sm:mb-1.5 uppercase tracking-wide">Teaching Experience *</label>
                          <textarea
                            required
                            rows={2}
                            placeholder="e.g. 5 years of teaching Mathematics and Science for CBSE and Kerala State syllabus."
                            value={form.experience}
                            onChange={(e) => setForm({ ...form, experience: e.target.value })}
                            className="w-full border border-gray-200 rounded-xl px-3 sm:px-4 py-3 sm:py-3.5 text-sm outline-none focus:border-[#D97706] focus:ring-2 focus:ring-amber-100 transition-all placeholder-gray-400 resize-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] sm:text-xs font-semibold text-gray-600 mb-1 sm:mb-1.5 uppercase tracking-wide">Short Bio*</label>
                          <textarea
                            placeholder="Tell parents about your teaching style and experience..."
                            rows={3}
                            value={form.bio}
                            onChange={(e) => setForm({ ...form, bio: e.target.value })}
                            className="w-full border border-gray-200 rounded-xl px-3 sm:px-4 py-3 sm:py-3.5 text-sm outline-none focus:border-[#D97706] focus:ring-2 focus:ring-amber-100 transition-all placeholder-gray-400 resize-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] sm:text-xs font-semibold text-gray-600 mb-1 sm:mb-1.5 uppercase tracking-wide">Resume *</label>
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleResumeChange}
                            className="w-full border border-gray-200 rounded-xl px-3 sm:px-4 py-3 sm:py-3.5 text-sm outline-none focus:border-[#D97706] focus:ring-2 focus:ring-amber-100 transition-all file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-amber-100 file:text-amber-700"
                          />
                          {resumeError ? (
                            <p className="text-red-500 text-[10px] sm:text-xs mt-1">{resumeError}</p>
                          ) : (
                            <p className="text-[10px] sm:text-xs text-gray-400 mt-1">
                              {form.resume ? form.resume.name : 'Accepted formats: .pdf, .doc, .docx'}
                            </p>
                          )}
                        </div>

                        {step2Error && (
                          <p className="text-red-500 text-xs sm:text-sm bg-red-50 border border-red-100 rounded-xl px-3 py-2">{step2Error}</p>
                        )}

                        <div className="flex gap-2 sm:gap-3">
                          <button type="button" onClick={() => setStep(1)}
                            className="flex-1 border border-gray-200 text-gray-600 font-semibold py-3 sm:py-3.5 rounded-xl hover:bg-gray-50 transition-colors text-xs sm:text-sm">
                            ← Back
                          </button>
                          <button type="button" onClick={goToStep3}
                            className="flex-1 bg-[#D97706] text-white font-bold py-3 sm:py-3.5 rounded-xl hover:bg-amber-600 transition-colors text-xs sm:text-sm shadow-lg shadow-amber-200">
                            Review →
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* ── Step 3 ── */}
                    {step === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-col gap-4 sm:gap-5"
                      >
                        <h2 className="text-base sm:text-lg font-bold text-gray-900">Review Your Application</h2>

                        <div className="bg-[#F0F2F5] rounded-xl sm:rounded-2xl p-4 sm:p-5 flex flex-col gap-3 sm:gap-3.5 text-xs sm:text-sm">
                          {[
                            { label: 'Name',       value: form.full_name },
                            { label: 'Email',      value: form.email },
                            { label: 'Phone',      value: form.phone },
                            { label: 'Location',   value: form.location },
                            { label: 'Subjects',   value: form.subject_ids.map(subjectName).filter(Boolean).join(', ') || '—' },
                            { label: 'Classes',    value: form.class_ids.map(className).filter(Boolean).join(', ') || '—' },
                            { label: 'Syllabi',    value: form.syllabus_ids.map(syllabusLabel).filter(Boolean).join(', ') || '—' },
                            { label: 'Experience', value: form.experience || '—' },
                            { label: 'Resume',     value: form.resume?.name || 'Not provided' },
                          ].map((item) => (
                            <div key={item.label} className="flex justify-between items-start gap-3 sm:gap-4 pb-2.5 sm:pb-3 border-b border-gray-200 last:border-0 last:pb-0">
                              <span className="text-gray-400 shrink-0 text-[10px] sm:text-xs">{item.label}</span>
                              <span className="font-semibold text-gray-900 text-right text-[10px] sm:text-xs">{item.value || '—'}</span>
                            </div>
                          ))}
                        </div>

                        {submitError && (
                          <p className="text-red-500 text-xs sm:text-sm bg-red-50 border border-red-100 rounded-xl px-3 py-2">{submitError}</p>
                        )}

                        <div className="flex gap-2 sm:gap-3">
                          <button type="button" onClick={() => setStep(2)}
                            className="flex-1 border border-gray-200 text-gray-600 font-semibold py-3 sm:py-3.5 rounded-xl hover:bg-gray-50 transition-colors text-xs sm:text-sm">
                            ← Edit
                          </button>
                          <button type="submit" disabled={submitting}
                            className="flex-1 bg-[#059669] text-white font-bold py-3 sm:py-3.5 rounded-xl hover:bg-emerald-600 transition-colors text-xs sm:text-sm shadow-lg shadow-green-200 disabled:opacity-60 disabled:cursor-not-allowed">
                            {submitting ? 'Submitting…' : 'Submit Application'}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </main>
  );
}
