// src/components/ContactUs.js
import React, { useState } from "react";

/**
 * ContactUs Component
 * Provides a contact form for users to send messages.
 * Simulates form submission and displays success/error messages.
 */
const ContactUs = () => {
  // State to manage form data (name, email, message)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  // State to manage the submission status ('success', 'error', or null)
  const [submissionStatus, setSubmissionStatus] = useState(null);

  /**
   * Handles changes in form input fields.
   * Updates the formData state based on the input's name and value.
   * @param {object} e - The event object from the input change.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Handles form submission.
   * Prevents default form submission, simulates an API call, and updates submission status.
   * In a real application, this would send data to a backend.
   * @param {object} e - The event object from the form submission.
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form refresh
    setSubmissionStatus(null); // Reset status on new submission attempt

    try {
      // Simulate an asynchronous API call (e.g., using fetch to a backend endpoint)
      // In a live application, you would replace this Promise with actual fetch logic:
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });
      // if (!response.ok) throw new Error('Network response was not ok.');
      // const result = await response.json();

      // Simulate a network delay for demonstration purposes
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Contact form submitted:", formData); // Log form data for debugging
      setSubmissionStatus("success"); // Set status to success
      setFormData({ name: "", email: "", message: "" }); // Clear the form
    } catch (error) {
      console.error("Submission error:", error); // Log any submission errors
      setSubmissionStatus("error"); // Set status to error
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg my-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-indigo-700 mb-6 border-b pb-3">
        Contact Us
      </h2>
      <div className="space-y-6">
        <p className="text-gray-700 leading-relaxed">
          Have questions or need assistance? Please feel free to reach out to us
          using the form below. We aim to respond to all inquiries within 2
          business days.
        </p>

        {/* Contact Form */}
        {/* The grid is now 'grid-cols-1' to ensure the form always takes full width as there's no second column */}
        <div className="grid grid-cols-1 gap-6">
          <div className="mx-auto w-full max-w-md">
            {" "}
            {/* Added mx-auto and max-w-md to narrow the form */}
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Send Us a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Send Message
              </button>
              {/* Submission Status Messages (conditionally rendered) */}
              {submissionStatus === "success" && (
                <p className="text-green-600 mt-2 text-center">
                  Thank you for your message! We will get back to you shortly.
                </p>
              )}
              {submissionStatus === "error" && (
                <p className="text-red-600 mt-2 text-center">
                  There was an error sending your message. Please try again
                  later or contact us directly.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
