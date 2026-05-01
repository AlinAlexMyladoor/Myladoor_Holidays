import type { Metadata } from 'next';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Admin Panel | Myladoor Holidays',
  description: 'Myladoor Holidays Admin Dashboard',
  robots: 'noindex, nofollow',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
