import type { Metadata } from 'next';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Admin Panel | Myladoor Holidays',
  description: 'Myladoor Holidays Admin Dashboard',
  robots: 'noindex, nofollow',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Hide main navbar, footer, floating buttons for admin */}
      <style>{`
        header.fixed, footer, .wa-btn, a[aria-label="Contact Myladoor Holidays"] {
          display: none !important;
        }
        main.flex-1 { padding-top: 0 !important; }
      `}</style>
      {children}
    </>
  );
}
