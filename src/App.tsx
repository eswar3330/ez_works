import React, { useState } from 'react';
import { ServiceCarousel } from './components/ServiceCarousel';
import USPSection from "./components/USPSection";
import { ContactForm } from './components/ContactForm';

function App() {
  const [showContactForm, setShowContactForm] = useState(false);
  const [selectedService, setSelectedService] = useState<string>();

  const handleGetInTouch = (service?: string) => {
    setSelectedService(service);
    setShowContactForm(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <ServiceCarousel onGetInTouch={handleGetInTouch} />
      <USPSection />
      {showContactForm && (
        <ContactForm
          onClose={() => setShowContactForm(false)}
          selectedService={selectedService}
        />
      )}
    </div>
  );
}

export default App;