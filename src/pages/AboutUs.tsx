import AboutusDrivesUsSection from "../components/AboutusDrivesUsSection";
import AboutusEndSection from "../components/AboutusEndSection";
import AboutusFoundationSection from "../components/AboutusFoundationSection";
import AboutusheroSection from "../components/AboutusheroSection";

import AboutusJourneySection from "../components/AboutusJourneySection";
import AboutusLeadershipSection from "../components/AboutusLeadershipSection";
import AboutusVedioSection from "../components/AboutusVedioSection";
import ContactToggle from "../components/ContactToggle";
import NavberDashboard from "../components/NavberDashboard";

function AboutUs() {
  return (
    <>
    
      <NavberDashboard />
      <AboutusheroSection />
      <ContactToggle/>
      <AboutusFoundationSection />
      <AboutusVedioSection />
      <AboutusDrivesUsSection />
      <AboutusJourneySection />

      <AboutusLeadershipSection />
     
      <AboutusEndSection/>
      
    </>
  );
}

export default AboutUs;
