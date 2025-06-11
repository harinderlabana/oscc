// src/components/Legal.js
import React, { useRef, useEffect } from "react";

/**
 * Legal Component
 * Displays various legal information sections such as Terms of Service, Privacy Policy, and Disclaimer.
 * It uses React refs and the useEffect hook to enable programmatic scrolling to a specific
 * section identified by its ID, useful for deep linking from the footer.
 *
 * @param {object} props - The component props.
 * @param {string} [props.scrollToId] - The ID of the section to scroll to when the component mounts or this ID changes.
 * Expected values: 'terms-of-service-section', 'privacy-policy-section', 'disclaimer-section'.
 */
const Legal = ({ scrollToId }) => {
  // Create refs for each individual section within the legal document.
  // These refs will be attached to the respective <section> elements.
  const termsRef = useRef(null);
  const privacyRef = useRef(null);
  const disclaimerRef = useRef(null);

  // useEffect hook to handle scrolling logic.
  // It runs when the component mounts or when the 'scrollToId' prop changes.
  useEffect(() => {
    // Only attempt to scroll if a 'scrollToId' is provided.
    if (scrollToId) {
      let targetElement = null; // Variable to hold the DOM element to scroll to

      // Determine which ref corresponds to the provided scrollToId
      switch (scrollToId) {
        case "terms-of-service-section":
          targetElement = termsRef.current;
          break;
        case "privacy-policy-section":
          targetElement = privacyRef.current;
          break;
        case "disclaimer-section":
          targetElement = disclaimerRef.current;
          break;
        default:
          // If the ID doesn't match any known section, do nothing.
          break;
      }

      // If a target element was found, scroll it into the viewport smoothly.
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [scrollToId]); // Dependency array: the effect re-runs when scrollToId changes.

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg my-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-indigo-700 mb-6 border-b pb-3">
        Legal Information
      </h2>
      <div className="space-y-6 text-gray-700 leading-relaxed">
        {/* Terms of Service Section */}
        {/* The 'id' attribute allows direct linking, and 'ref' allows programmatic scrolling */}
        <section id="terms-of-service-section" ref={termsRef}>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Terms of Service
          </h3>
          <p>
            Welcome to Ontario SeniorCare Compass. By accessing or using our
            website at ontarioseniorcarecompass.com (the "Site"), you agree to
            comply with and be bound by the following terms and conditions of
            use ("Terms of Service"). Please review these terms carefully. If
            you do not agree to these terms, you should not use this Site.
          </p>
          <p className="mt-2 font-semibold text-gray-700">
            1. Acceptance of Terms
          </p>
          <p className="text-sm text-gray-600">
            By using the Site, you acknowledge that you have read, understood,
            and agree to be bound by these Terms of Service. We reserve the
            right to modify these Terms at any time without prior notice. Your
            continued use of the Site after any such changes constitutes your
            acceptance of the new Terms.
          </p>
          <p className="mt-2 font-semibold text-gray-700">2. Use of Website</p>
          <p className="text-sm text-gray-600">
            This Site is intended to provide general information about senior
            care homes in Ontario. You agree to use the Site only for lawful
            purposes and in a way that does not infringe the rights of,
            restrict, or inhibit anyone else's use and enjoyment of the Site.
            Prohibited behavior includes harassing or causing distress or
            inconvenience to any other user, transmitting obscene or offensive
            content, or disrupting the normal flow of dialogue within the Site.
          </p>
          <p className="mt-2 font-semibold text-gray-700">
            3. Intellectual Property
          </p>
          <p className="text-sm text-gray-600">
            All content on this Site, including text, graphics, logos, icons,
            images, and software, is the property of Ontario SeniorCare Compass
            or its content suppliers and is protected by Canadian and
            international copyright laws. The compilation of all content on this
            Site is the exclusive property of Ontario SeniorCare Compass.
          </p>
          <p className="mt-2 font-semibold text-gray-700">4. Disclaimers</p>
          <p className="text-sm text-gray-600">
            The information provided on this Site is for general informational
            purposes only and does not constitute professional advice. While we
            strive to keep the information up-to-date and correct, we make no
            representations or warranties of any kind, express or implied, about
            the completeness, accuracy, reliability, suitability, or
            availability with respect to the Site or the information, products,
            services, or related graphics contained on the Site for any purpose.
            Any reliance you place on such information is therefore strictly at
            your own risk.
          </p>
          <p className="mt-2 font-semibold text-gray-700">
            5. Limitation of Liability
          </p>
          <p className="text-sm text-gray-600">
            In no event will Ontario SeniorCare Compass be liable for any loss
            or damage including without limitation, indirect or consequential
            loss or damage, or any loss or damage whatsoever arising from loss
            of data or profits arising out of, or in connection with, the use of
            this Site.
          </p>
          <p className="mt-2 font-semibold text-gray-700">6. Indemnification</p>
          <p className="text-sm text-gray-600">
            You agree to indemnify, defend, and hold harmless Ontario SeniorCare
            Compass, its affiliates, officers, directors, employees, agents, and
            licensors from and against any and all claims, liabilities, damages,
            losses, costs, expenses, or fees (including reasonable attorneys'
            fees) that such parties may incur as a result of or arising from
            your (or anyone using your account's) violation of these Terms of
            Service.
          </p>
          <p className="mt-2 font-semibold text-gray-700">7. Governing Law</p>
          <p className="text-sm text-gray-600">
            These Terms of Service are governed by and construed in accordance
            with the laws of the Province of Ontario and the federal laws of
            Canada applicable therein, without regard to its conflict of law
            principles.
          </p>
          <p className="mt-2 font-semibold text-gray-700">
            8. Changes to Terms
          </p>
          <p className="text-sm text-gray-600">
            We reserve the right to revise these Terms of Service at any time.
            All changes are effective immediately when we post them. Your
            continued use of the Site following the posting of revised Terms of
            Service means that you accept and agree to the changes.
          </p>
        </section>

        {/* Privacy Policy Section */}
        <section id="privacy-policy-section" ref={privacyRef}>
          <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-6 border-t pt-4">
            Privacy Policy
          </h3>
          <p>
            Your privacy is important to us. This Privacy Policy explains how
            Ontario SeniorCare Compass ("we," "us," or "our") collects, uses,
            discloses, and safeguards your information when you visit our
            website at ontarioseniorcarecompass.com (the "Site").
          </p>
          <p className="mt-2 font-semibold text-gray-700">
            1. Information We Collect
          </p>
          <p className="text-sm text-gray-600">
            We collect information that you provide directly to us, such as your
            name, email address, and any message content when you use our
            contact form. We also collect non-personal information automatically
            as you navigate through the Site, such as usage details, IP
            addresses, and information collected through cookies and other
            tracking technologies.
          </p>
          <p className="mt-2 font-semibold text-gray-700">
            2. How We Use Your Information
          </p>
          <p className="text-sm text-gray-600">
            We use the information we collect to:
          </p>
          <ul className="list-disc list-inside ml-4 mt-1 text-sm text-gray-600">
            <li>Provide, operate, and maintain our Site.</li>
            <li>Respond to your inquiries and provide customer support.</li>
            <li>Improve our Site and develop new features.</li>
            <li>Understand and analyze how you use our Site.</li>
            <li>Convey updates or important notices.</li>
          </ul>
          <p className="mt-2 font-semibold text-gray-700">
            3. How We Share Your Information
          </p>
          <p className="text-sm text-gray-600">
            We do not sell, trade, or otherwise transfer to outside parties your
            Personally Identifiable Information without your consent. This does
            not include trusted third parties who assist us in operating our
            website, conducting our business, or serving our users, so long as
            those parties agree to keep this information confidential. We may
            also release information when its release is appropriate to comply
            with the law, enforce our site policies, or protect ours or others'
            rights, property or safety.
          </p>
          <p className="mt-2 font-semibold text-gray-700">4. Data Security</p>
          <p className="text-sm text-gray-600">
            We implement a variety of security measures designed to maintain the
            safety of your personal information when you submit your
            information. However, no electronic transmission over the Internet
            or information storage technology can be guaranteed to be 100%
            secure.
          </p>
          <p className="mt-2 font-semibold text-gray-700">
            5. Cookies and Tracking Technologies
          </p>
          <p className="text-sm text-gray-600">
            We use cookies and similar tracking technologies to track the
            activity on our Site and hold certain information. Cookies are files
            with a small amount of data which may include an anonymous unique
            identifier. You can instruct your browser to refuse all cookies or
            to indicate when a cookie is being sent. However, if you do not
            accept cookies, you may not be able to use some portions of our
            Site.
          </p>
          <p className="mt-2 font-semibold text-gray-700">
            6. Third-Party Websites
          </p>
          <p className="text-sm text-gray-600">
            Our Site may contain links to third-party websites that are not
            operated by us. If you click on a third-party link, you will be
            directed to that third party's site. We strongly advise you to
            review the Privacy Policy of every site you visit. We have no
            control over and assume no responsibility for the content, privacy
            policies, or practices of any third-party sites or services.
          </p>
          <p className="mt-2 font-semibold text-gray-700">
            7. Children's Privacy
          </p>
          <p className="text-sm text-gray-600">
            Our Site is not intended for individuals under the age of 18. We do
            not knowingly collect personally identifiable information from
            anyone under the age of 18. If you are a parent or guardian and you
            are aware that your child has provided us with Personal Data, please
            contact us. If we become aware that we have collected Personal Data
            from children without verification of parental consent, we take
            steps to remove that information from our servers.
          </p>
          <p className="mt-2 font-semibold text-gray-700">
            8. Changes to This Privacy Policy
          </p>
          <p className="text-sm text-gray-600">
            We may update our Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page.
            You are advised to review this Privacy Policy periodically for any
            changes. Changes to this Privacy Policy are effective when they are
            posted on this page.
          </p>
        </section>

        {/* Disclaimer Section */}
        <section id="disclaimer-section" ref={disclaimerRef}>
          <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-6 border-t pt-4">
            Disclaimer
          </h3>
          <p>
            The information provided by Ontario SeniorCare Compass on
            ontarioseniorcarecompass.com (the "Site") is for general
            informational purposes only. All information on the Site is provided
            in good faith, however we make no representation or warranty of any
            kind, express or implied, regarding the accuracy, adequacy,
            validity, reliability, availability, or completeness of any
            information on the Site.
          </p>
          <p className="mt-2 font-semibold text-gray-700">
            External Links Disclaimer
          </p>
          <p className="text-sm text-gray-600">
            The Site may contain (or you may be sent through the Site) links to
            other websites or content belonging to or originating from third
            parties or links to websites and features in banners or other
            advertising. Such external links are not investigated, monitored, or
            checked for accuracy, adequacy, validity, reliability, availability,
            or completeness by us. We do not warrant, endorse, guarantee, or
            assume responsibility for the accuracy or reliability of any
            information offered by third-party websites linked through the Site
            or any website or feature linked in any banner or other advertising.
            We will not be a party to or in any way be responsible for
            monitoring any transaction between you and third-party providers of
            products or services.
          </p>
          <p className="mt-2 font-semibold text-gray-700">
            Professional Advice Disclaimer
          </p>
          <p className="text-sm text-gray-600">
            The Site cannot and does not contain medical, legal, or financial
            advice. The information is provided for general informational and
            educational purposes only and is not a substitute for professional
            advice. Accordingly, before taking any actions based upon such
            information, we encourage you to consult with the appropriate
            professionals. We do not provide any kind of medical, legal, or
            financial advice. The use or reliance of any information contained
            on this Site is solely at your own risk.
          </p>
          <p className="mt-2 font-semibold text-gray-700">
            Errors and Omissions Disclaimer
          </p>
          <p className="text-sm text-gray-600">
            While we have made every attempt to ensure that the information
            contained in this Site has been obtained from reliable sources,
            Ontario SeniorCare Compass is not responsible for any errors or
            omissions or for the results obtained from the use of this
            information. All information in this Site is provided "as is," with
            no guarantee of completeness, accuracy, timeliness, or of the
            results obtained from the use of this information, and without
            warranty of any kind, express or implied, including, but not limited
            to warranties of performance, merchantability, and fitness for a
            particular purpose.
          </p>
          <p className="mt-2 font-semibold text-gray-700">
            Fair Use Disclaimer
          </p>
          <p className="text-sm text-gray-600">
            This Site may contain copyrighted material the use of which has not
            always been specifically authorized by the copyright owner. We are
            making such material available in our efforts to advance
            understanding of environmental, political, human rights, economic,
            democracy, scientific, and social justice issues, etc. We believe
            this constitutes a "fair use" of any such copyrighted material as
            provided for in section 107 of the US Copyright Law. If you wish to
            use copyrighted material from this Site for purposes of your own
            that go beyond "fair use," you must obtain permission from the
            copyright owner.
          </p>
          <p className="mt-2 font-semibold text-gray-700">
            Views Expressed Disclaimer
          </p>
          <p className="text-sm text-gray-600">
            The Site may contain views and opinions which are those of the
            authors and do not necessarily reflect the official policy or
            position of any other agency, organization, employer, or company.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Legal;
