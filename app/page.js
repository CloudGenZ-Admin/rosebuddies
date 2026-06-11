import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import SocialProof from "../components/SocialProof"; // NEW
import Problem from "../components/Problem";
import NoAlgorithm from "../components/NoAlgorithm"; // NEW
import HowItWorks from "../components/HowItWorks";
import Experiences from "../components/Experiences"; 
import CuratedExperiences from "../components/CuratedExperiences"; // NEW
import CommunityStandards from "../components/CommunityStandards"; // NEW
import Pricing from "../components/Pricing";
import WaitlistForm from "../components/WaitlistForm"; 
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className=" ">
      <Navbar />
      
      <Hero />
      <SocialProof />
      
      {/* <Problem />  */}
      {/* <NoAlgorithm /> */}
      
      <HowItWorks />
      
      {/* <Experiences />  */}
      <CuratedExperiences />
      <CommunityStandards />
      
      {/* <Pricing /> */}
      <WaitlistForm /> 
      <FAQ />
     
      <Footer />
    </main>
  );
}