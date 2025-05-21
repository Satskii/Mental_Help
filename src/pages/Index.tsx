
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import LandingHero from '@/components/LandingHero';

const Index: React.FC = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Auto redirect to chat page after 5 seconds
    const redirectTimer = setTimeout(() => {
      navigate('/chat');
    }, 5000);
    
    return () => clearTimeout(redirectTimer);
  }, [navigate]);

  return (
    <div className="min-h-screen landing-gradient">
      <Navbar />
      <main className="container px-4 pt-16 md:pt-24 pb-16">
        <LandingHero />
      </main>
    </div>
  );
};

export default Index;
