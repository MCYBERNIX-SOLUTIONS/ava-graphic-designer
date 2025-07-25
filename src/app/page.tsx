import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Portfolio from '@/sections/Portfolio';
import Services from '@/sections/Services';
import Testimonials from '@/sections/Testimonials';
import Contact from '@/sections/Contact';

export default function Home() {
  return (
    <main className="bg-black text-white overflow-x-hidden">
      <Hero />
      <About />
      <Portfolio />
      <Services />
      <Testimonials />
      <Contact />
    </main>
  );
}
