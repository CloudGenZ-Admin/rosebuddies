import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Problem from '../components/Problem';
import HowItWorks from '../components/HowItWorks';
import Experiences from '../components/Experiences';
import Pricing from '../components/Pricing';
import WaitlistForm from '../components/WaitlistForm';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Problem />
      <HowItWorks />
      <Experiences />
      <Pricing />
      <WaitlistForm />
      <FAQ />
      <Footer />
    </main>
  );
}