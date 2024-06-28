import Section from "@/components/layouts/Section";
import CategoryCards from "@/components/public/category-cards";
import HeroSection from "@/components/public/hero-section";
import React from "react";

const HomePage = () => {
  return (
    <Section>
      <HeroSection />
      <CategoryCards />
    </Section>
  );
};

export default HomePage;
