// src/components/FAQ.js
import React from "react";

/**
 * FAQ Component
 * Displays a list of Frequently Asked Questions and their answers.
 * This component is self-contained and renders static content.
 */
const FAQ = () => {
  // Array of FAQ objects, each containing a question (q) and an answer (a).
  const faqs = [
    {
      q: "What types of care homes are listed?",
      a: "Our directory includes both Retirement Homes and Long-Term Care Homes across Ontario, catering to various levels of senior care needs. Retirement Homes are for seniors who are largely independent but may need some assistance, while Long-Term Care Homes (nursing homes) provide 24-hour nursing care for those with more complex needs.",
    },
    {
      q: "How often is the information updated?",
      a: "We strive to update our directory regularly. However, information on costs, room types, and particularly waitlist availability is subject to frequent change by the individual homes and government bodies. We recommend contacting the homes or your HCCSS care coordinator directly for the most current details.",
    },
    {
      q: "Is there a cost to use this directory?",
      a: "No, our directory is completely free to use for all families and individuals seeking care home information. Our mission is to provide an accessible resource for finding senior care options in Ontario.",
    },
    {
      q: "Can I filter by specific medical conditions like dementia care or palliative care?",
      a: "While our primary filters cover location, home type, room type, and cost, the detailed profile for each home often highlights specialized care services such as dementia care, palliative care, or restorative care. You can also use the main search bar to look for specific terms related to medical conditions or care needs.",
    },
    {
      q: "What does 'Subsidy Available' mean for Long-Term Care Homes?",
      a: "'Subsidy Available' for Long-Term Care Homes indicates that the Ontario government subsidizes the cost of basic accommodation for eligible residents based on income. Residents are responsible for the co-payment portion. This is managed through Home and Community Care Support Services (HCCSS).",
    },
    {
      q: "How accurate are the waitlist numbers?",
      a: "The waitlist numbers provided for Long-Term Care Homes are estimates based on publicly available data, but they can fluctuate rapidly due to various factors including new admissions, resident transfers, and changes in individual priority levels. For the most accurate and up-to-date waitlist information, it is essential to contact your local Home and Community Care Support Services (HCCSS) office or the specific home directly.",
    },
    {
      q: "Why are there no waitlist numbers for Retirement Homes?",
      a: "Currently, there is no centralized public reporting system for waitlist data for Retirement Homes in Ontario. Waitlist information for Retirement Homes is managed directly by each individual home, and you would need to contact them personally to inquire about their availability and wait times.",
    },
    {
      q: "What should I do if a home I'm interested in has a long waitlist?",
      a: "If a Long-Term Care Home has a long waitlist, it's advisable to apply to multiple homes (up to five options are typically allowed via HCCSS) and consider different room types (basic, semi-private, private) as availability can vary. You can also discuss alternative care options with your HCCSS care coordinator.",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg my-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-indigo-700 mb-6 border-b pb-3">
        Frequently Asked Questions
      </h2>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          // Each FAQ item is rendered in a div, with a unique key for React's list rendering optimization
          <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {faq.q}
            </h3>
            <p className="text-gray-700 leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
