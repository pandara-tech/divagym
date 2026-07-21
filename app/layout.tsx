import type {Metadata} from 'next';
import { Cairo } from 'next/font/google';
import './globals.css'; // Global styles

const cairo = Cairo({
  subsets: ['latin', 'arabic'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-cairo',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Diva Gym - Premium Women\'s Fitness & Wellness',
  description: 'Diva Gym is a premium women-only fitness and wellness club offering state-of-the-art training, luxury spa, sauna, classes, and personalized nutrition plans.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${cairo.variable}`}>
      <body className="font-sans antialiased text-zinc-800 bg-zinc-50 dark:text-zinc-100 dark:bg-zinc-950 transition-colors duration-300" style={{ fontFamily: 'var(--font-cairo), system-ui, sans-serif' }} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
