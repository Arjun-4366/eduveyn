import type { Metadata } from 'next';
import LoginForm from '@/components/Login/LoginForm';

export const metadata: Metadata = {
  title: 'Student Login',
  description: 'Log in to your Eduveyn student account to join live classes, view homework, and manage payments.',
  alternates: {
    canonical: '/login',
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginPage() {
  return <LoginForm />;
}
