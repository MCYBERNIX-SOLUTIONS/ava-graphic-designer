import Navbar from '@/components/Navbar';
import './globals.css';
import { Inter, Playfair_Display } from 'next/font/google';
import Footer from '@/components/Footer';


const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata = {
  title: 'Ava Designs | Graphic Designer Portfolio',
  description: 'Portfolio of a visionary graphic designer – Ava Designs.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-[#0e0e0e] text-[#f5f5f5]">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
