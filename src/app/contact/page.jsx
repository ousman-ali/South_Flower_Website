"use client";

import { getBatchData } from "@/api/service";
import Breadcrumb from "@/components/breadcrumb/BreadCrumb";
import ContactSection from "@/components/contact/ContactSection";
import { useEffect, useState } from "react";

export default function AboutPage() {
  const [aboutContent, setAboutContent] = useState([]);
  const [setup, setSetup] = useState(null);

  useEffect(() => {
    const features = [
      { name: "about_content", amount: 4 },
      { name: "about_setup" },
    ];

    async function fetchData() {
      try {
        const data = await getBatchData(features);

        // Set states individually
        setAboutContent(data.about_content.data || []);
        setSetup(data.about_setup.data || null);
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      {/* Breadcrumb Component */}
      <Breadcrumb
        pageTitle="Contacts"
        pageName="Our Socials"
        currentPage="Contact South Flower"
        backgroundImage="/images/bread3.jpg"
      />
      <ContactSection setup={setup} aboutContent={aboutContent} />
    </div>
  );
}
