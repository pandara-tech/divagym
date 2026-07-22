import type {Metadata} from 'next';
import { Cairo, Great_Vibes } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css'; // Global styles

const cairo = Cairo({
  subsets: ['latin', 'arabic'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-cairo',
  display: 'swap',
});

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-great-vibes',
  display: 'swap',
});

const kurdishFont = localFont({
  src: '../kurdishfont.ttf',
  variable: '--font-kurdish',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Diva Gym',
  description: 'Diva Gym is a premium women-only fitness and wellness club offering state-of-the-art training, luxury spa, sauna, classes, and personalized nutrition plans.',
  icons: {
    icon: '/divagym/icon.png',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${cairo.variable} ${greatVibes.variable} ${kurdishFont.variable}`}>
      <body className="font-sans antialiased text-zinc-800 bg-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
